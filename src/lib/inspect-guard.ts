/**
 * Deterrent layer: hides the obvious ways to inspect the site (right-click
 * menu, DevTools shortcuts, view-source, save-page, dragging photos out).
 *
 * This is a deterrent, not a lock — anyone who disables JavaScript or opens
 * the page from another browser still sees the same HTML. Real secrets must
 * stay on the server.
 *
 * The owner asked for the guard everywhere, including the Lovable preview, so
 * no host is exempt.
 */

// Hosts where the guard is skipped. Intentionally empty: active on every host.
const OWNER_HOSTS: string[] = [];

/** Keys that open DevTools, view source, or save the page. */
export function shouldBlockInspectKey(
  key: string,
  mods: { ctrlKey: boolean; metaKey: boolean; shiftKey: boolean },
): boolean {
  const k = key.toUpperCase();
  const modifier = mods.ctrlKey || mods.metaKey;
  if (key === "F12") return true;
  // Ctrl/Cmd + Shift + I (inspect), J (console), C (picker)
  if (modifier && mods.shiftKey && ["I", "J", "C"].includes(k)) return true;
  // Ctrl/Cmd + U (view source), Ctrl/Cmd + S (save page)
  if (modifier && !mods.shiftKey && ["U", "S"].includes(k)) return true;
  return false;
}

/** Editing fields keep their native menu (paste, spelling, select all). */
export function shouldBlockContextMenu(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return true;
  const editable = target.closest(
    "input, textarea, select, [contenteditable='true'], [contenteditable='']",
  );
  return editable === null;
}

/** True when the guard must not run on this host (none by default). */
export function isInspectGuardDisabled(hostname: string): boolean {
  return OWNER_HOSTS.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`),
  );
}

export function installInspectGuard(
  hostname: string = typeof window === "undefined" ? "" : window.location.hostname,
): () => void {
  if (typeof window === "undefined") return () => {};
  if (isInspectGuardDisabled(hostname)) return () => {};

  const onContextMenu = (event: MouseEvent) => {
    if (shouldBlockContextMenu(event.target)) event.preventDefault();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (shouldBlockInspectKey(event.key, {
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
    })) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onDragStart = (event: DragEvent) => {
    if (event.target instanceof HTMLImageElement) event.preventDefault();
  };

  document.addEventListener("contextmenu", onContextMenu);
  window.addEventListener("keydown", onKeyDown, true);
  document.addEventListener("dragstart", onDragStart);

  return () => {
    document.removeEventListener("contextmenu", onContextMenu);
    window.removeEventListener("keydown", onKeyDown, true);
    document.removeEventListener("dragstart", onDragStart);
  };
}
