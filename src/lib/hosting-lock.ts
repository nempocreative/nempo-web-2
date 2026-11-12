// Paths that exist only for the editor preview; published domains answer 404.
export const LOCKED_PREFIXES = ["/cms", "/backup", "/api/backup"];

export function isPreviewHost(host: string): boolean {
  const h = host.split(":")[0]!.toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h.startsWith("id-preview--") ||
    h.endsWith(".lovableproject.com")
  );
}

export function isLockedPath(pathname: string): boolean {
  return LOCKED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function shouldBlock(host: string, pathname: string): boolean {
  return !isPreviewHost(host) && isLockedPath(pathname);
}
