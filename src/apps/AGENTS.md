# Rules for `src/apps/`

- Sub-apps live in `src/apps/<key>/` (own `@/apps/<key>/` imports, `entry.tsx`, public files under `public/<base>/`) and mount at `/<base>` via `src/routes/<base>.index.tsx` + `<base>.$.tsx` using `AppShell`; why: each was a separate Vite app and they must not collide.
