import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
// Falls back to plain string while the database schema is still empty (tables not migrated yet).
type TableName = [keyof Tables] extends [never] ? string : keyof Tables;

/** Every table in the database. Adding a table to the database without listing it here fails the type check. */
export const BACKUP_TABLES = [
  "banners",
  "berita",
  "community_applications",
  "digital_services",
  "event_tickets",
  "events",
  "influencers",
  "kamus_sunda",
  "kuliner",
  "media_archive",
  "partners",
  "penginapan",
  "perlombaan",
  "price_list",
  "promo_banners",
  "site_settings",
  "talents",
  "transportasi",
  "vouchers",
  "wisata",
  "yearbook_photo_submissions",
] as const satisfies readonly TableName[];

// user_roles and admin_allowlist hold admin access grants and are deliberately never exported.
type MissingTables = Exclude<keyof Tables, (typeof BACKUP_TABLES)[number] | "user_roles" | "admin_allowlist">;
// Compile-time guard: errors when a database table is missing from BACKUP_TABLES.
const _allTablesCovered: [MissingTables] extends [never] ? true : MissingTables = true;
void _allTablesCovered;

export type BackupTable = (typeof BACKUP_TABLES)[number];

export const BACKUP_FORMAT = "nempo-backup";
export const BACKUP_VERSION = 1;
export const BACKUP_PAGE_SIZE = 1000;

export type BackupTableResult = {
  rows: Record<string, unknown>[];
  expected: number | null;
  error?: string;
};

export type BackupFile = {
  format: typeof BACKUP_FORMAT;
  version: number;
  createdAt: string;
  summary: {
    tables: number;
    totalRows: number;
    complete: boolean;
    counts: Record<string, number>;
    problems: string[];
  };
  data: Record<string, Record<string, unknown>[]>;
  /** Site design (colours, fonts, styles) as of this backup. */
  design?: { files: Record<string, string> };
};

/** Order column for stable pagination. */
export function orderColumn(table: BackupTable): string {
  return table === "site_settings" ? "key" : "id";
}

/** Reads every page until a short page is returned, so no table is cut off at the page limit. */
export async function fetchAllRows(
  fetchPage: (from: number, to: number) => Promise<Record<string, unknown>[]>,
  pageSize = BACKUP_PAGE_SIZE,
): Promise<Record<string, unknown>[]> {
  const all: Record<string, unknown>[] = [];
  for (let from = 0; ; from += pageSize) {
    const page = await fetchPage(from, from + pageSize - 1);
    all.push(...page);
    if (page.length < pageSize) return all;
  }
}

export function buildBackupFile(
  results: Record<BackupTable, BackupTableResult>,
  createdAt: Date = new Date(),
  designFiles?: Record<string, string>,
): BackupFile {
  const data: BackupFile["data"] = {};
  const counts: Record<string, number> = {};
  const problems: string[] = [];
  let totalRows = 0;

  for (const table of BACKUP_TABLES) {
    const r = results[table];
    if (!r) {
      problems.push(`${table}: tidak terbaca`);
      data[table] = [];
      counts[table] = 0;
      continue;
    }
    data[table] = r.rows;
    counts[table] = r.rows.length;
    totalRows += r.rows.length;
    if (r.error) problems.push(`${table}: ${r.error}`);
    else if (r.expected !== null && r.expected !== r.rows.length)
      problems.push(`${table}: ${r.rows.length} dari ${r.expected} baris`);
  }

  return {
    format: BACKUP_FORMAT,
    version: BACKUP_VERSION,
    createdAt: createdAt.toISOString(),
    summary: { tables: BACKUP_TABLES.length, totalRows, complete: problems.length === 0, counts, problems },
    data,
    ...(designFiles ? { design: { files: designFiles } } : {}),
  };
}

export function backupFileName(date: Date = new Date()): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `nempo-organizer-backup-${date.getFullYear()}-${p(date.getMonth() + 1)}-${p(date.getDate())}-${p(date.getHours())}${p(date.getMinutes())}.json`;
}
