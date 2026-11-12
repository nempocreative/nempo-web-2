import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type Entity = Record<string, unknown> & { id?: number | string };
type Tables = Database['public']['Tables'];
// Falls back to plain string while the database schema is still empty (tables not migrated yet).
type TableName = [keyof Tables] extends [never] ? string : keyof Tables;

const USER_KEY = 'nempo_garut_admin_user';
let cachedToken = '';

export class ApiError extends Error {
  constructor(message: string, readonly status?: number) { super(message); this.name = 'ApiError'; }
}

/** The CMS now talks directly to Lovable Cloud; always configured. */
export function apiOrigin() { return 'cloud'; }
export function getStoredToken() { return cachedToken; }
export function getStoredUser() { return (typeof localStorage !== 'undefined' && localStorage.getItem(USER_KEY)) || 'Petugas'; }
export function clearSession() {
  cachedToken = '';
  localStorage.removeItem(USER_KEY);
  void supabase.auth.signOut();
}

/** Returns the session token only when the signed-in user is a verified admin (checked by the database). */
export async function restoreAdminSession(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: role } = await supabase.from('user_roles' as never).select('role').eq('user_id', data.user.id).eq('role', 'admin').maybeSingle();
  if (!role) return null;
  const { data: s } = await supabase.auth.getSession();
  cachedToken = s.session?.access_token ?? '';
  return cachedToken || null;
}

export async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new ApiError(error.message === 'Invalid login credentials' ? 'Email atau password salah.' : error.message);
  const token = await restoreAdminSession();
  if (!token) {
    await supabase.auth.signOut();
    throw new ApiError('Akun ini belum memiliki akses admin CMS.');
  }
  localStorage.setItem(USER_KEY, email.trim());
  return token;
}

const cmsUrl = (query = '') => `${window.location.origin}/cms/${query}`;

/** First visit after the migration: create the account; access is granted once the email is verified. */
export async function activateAccount(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email: email.trim(), password, options: { emailRedirectTo: cmsUrl() } });
  if (error) throw new ApiError(/already registered/i.test(error.message) ? 'Email ini sudah aktif. Silakan masuk atau gunakan Lupa password.' : error.message);
}

export async function sendPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: cmsUrl('?setpw=1') });
  if (error) throw new ApiError(error.message);
}

export async function setNewPassword(password: string) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw new ApiError(error.message);
}

/** CMS module slug -> database table. Modules not listed here have no table yet. */
export const tableFor: Record<string, TableName> = {
  wisata: 'wisata', kuliner: 'kuliner', cafe: 'kuliner', penginapan: 'penginapan', events: 'events',
  berita: 'berita', vouchers: 'vouchers', 'kamus-sunda': 'kamus_sunda', transportasi: 'transportasi',
  'price-list': 'price_list', 'digital-services': 'digital_services', banners: 'banners',
  'promo-banners': 'promo_banners', partners: 'partners', influencers: 'influencers', talent: 'talents',
};
export const supportedSlugs = new Set([...Object.keys(tableFor), 'settings', 'backup']);
/** Kept for compatibility with older imports. */
export const routeFor = tableFor;

const columnCache = new Map<string, Set<string>>();
async function columnsOf(table: TableName): Promise<Set<string> | null> {
  if (columnCache.has(table)) return columnCache.get(table)!;
  const { data } = await supabase.from(table as never).select('*').limit(1);
  if (!data?.length) return null;
  const set = new Set(Object.keys(data[0] as object));
  columnCache.set(table, set);
  return set;
}
async function clean(table: TableName, payload: unknown) {
  const out: Record<string, unknown> = {};
  const cols = await columnsOf(table);
  for (const [k, v] of Object.entries((payload ?? {}) as Record<string, unknown>)) {
    if (k === 'id' || k === 'created_at') continue;
    if (cols && !cols.has(k)) continue;
    out[k] = v === '' ? null : v;
  }
  if (!cols || cols.has('updated_at')) out.updated_at = new Date().toISOString();
  return out;
}
function fail(error: { message: string } | null) {
  if (!error) return;
  if (/column .* does not exist|Could not find the '(.+)' column/.test(error.message)) {
    const m = error.message.match(/'([^']+)' column/);
    throw new ApiError(`Kolom ${m?.[1] ?? ''} tidak tersedia di database.`);
  }
  throw new ApiError(error.message);
}
function tableOrThrow(slug: string) {
  const t = tableFor[slug];
  if (!t) throw new ApiError('Modul ini belum terhubung ke database.');
  return t;
}

export const resourceApi = {
  list: async (slug: string) => {
    const t = tableOrThrow(slug);
    let q = supabase.from(t as never).select('*').order('id', { ascending: false });
    if (slug === 'cafe') q = q.ilike('category' as never, '%cafe%');
    const { data, error } = await q; fail(error); return data ?? [];
  },
  create: async (slug: string, payload: unknown) => {
    const t = tableOrThrow(slug);
    const row = await clean(t, payload);
    if (slug === 'cafe' && !row.category) row.category = 'Cafe';
    const { error } = await supabase.from(t as never).insert(row as never); fail(error); return {};
  },
  update: async (slug: string, id: string | number, payload: unknown) => {
    const t = tableOrThrow(slug);
    const { error } = await supabase.from(t as never).update((await clean(t, payload)) as never).eq('id' as never, id as never); fail(error); return {};
  },
  remove: async (slug: string, id: string | number) => {
    if (slug === 'settings') { const { error } = await supabase.from('site_settings' as never).delete().eq('key', String(id)); fail(error); return {}; }
    const t = tableOrThrow(slug);
    const { error } = await supabase.from(t as never).delete().eq('id' as never, id as never); fail(error); return {};
  },
};

/** Legacy path-style requests used by CMS pages, mapped onto the database. */
export async function request<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  if (path === '/api/admin/stats') {
    const tables: TableName[] = ['wisata', 'kuliner', 'penginapan', 'events', 'berita', 'banners'];
    const counts = await Promise.all(tables.map(async t => {
      const { count } = await supabase.from(t as never).select('*', { count: 'exact', head: true });
      return [t, count ?? 0] as const;
    }));
    return Object.fromEntries(counts) as T;
  }
  if (path === '/api/admin/settings') {
    if (method === 'GET') {
      const { data, error } = await supabase.from('site_settings' as never).select('*').order('key'); fail(error);
      return (data ?? []).map((r: Record<string, unknown>) => ({ ...r, id: r.key })) as T;
    }
    const p = (body ?? {}) as Record<string, unknown>;
    const key = String(p.key ?? p.id ?? '').trim();
    if (!key) throw new ApiError('Kunci pengaturan wajib diisi.');
    const { error } = await supabase.from('site_settings' as never).upsert({ key, value: p.value == null ? null : String(p.value), updated_at: new Date().toISOString() } as never);
    fail(error); return {} as T;
  }
  if (path === '/api/admin/upload') throw new ApiError('Unggah file belum tersedia. Tempel URL gambar langsung pada kolom gambar.');
  throw new ApiError('Fitur ini belum terhubung ke database.');
}

export function asRows(value: unknown): Entity[] {
  if (Array.isArray(value)) return value.filter((row): row is Entity => !!row && typeof row === 'object');
  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    for (const key of ['data', 'items', 'results', 'rows']) if (Array.isArray(obj[key])) return (obj[key] as unknown[]).filter((row): row is Entity => !!row && typeof row === 'object');
    if ('id' in obj) return [obj as Entity];
  }
  return [];
}
