import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazy-with-retry";
import { ClientOnly } from "@tanstack/react-router";

const NempoApp = lazyWithRetry(() => import("@/nempo-app"));

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0194f3] border-t-transparent" />
    </div>
  );
}

export function NempoShell() {
  // Files that fail to load after an update are retried, then reloaded once, by lazyWithRetry.
  // Never preventDefault Vite's "vite:preloadError" here: that makes the import resolve empty and blanks the page.
  return (
    <div id="root">
      <ClientOnly fallback={<Loader />}>
        <Suspense fallback={<Loader />}>
          <NempoApp />
        </Suspense>
      </ClientOnly>
    </div>
  );
}
