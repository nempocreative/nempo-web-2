<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Architecture rules
- Friendship moment portfolios use browser-safe data, a scoped global CSS theme, a dedicated metadata leaf route mounting NempoShell, and the shared wall-message validator with session-only messages; why: category links, full albums, and honest preview submissions stay consistent without backend writes.
- Interactive yearbook memories use a focused browser-only UI and shared tested helpers; time capsules persist only in local device storage with downloadable backups, and sample farewell video uses the existing AI school photos; why: examples must work without pretending to send private letters or provide real class footage.
- Personal yearbook features use shared tested voting and quiz helpers; demo votes stay device-local, dream groups reference existing student aspirations, and Story cards are drawn on a canvas (`src/lib/story-card-canvas.ts`, loaded lazily) whose PNG is both the preview and the download; why: keep sample content honest, keep browser-only code out of SSR, and make the saved file match the preview on every browser including iOS.
- The whole NEMPO site (main pages and `/cms`; the Nempo Feed tool was later removed at the owner's request so the project holds only the organizer site) was migrated from nempocreative/nempo-web (originally nempocreative/remix-of-remix-of-remix-of-remix-of-nempo-feed-migration-4); its schema was rebuilt from the old generated types and is recorded in `docs/schema-baseline/0000_nempo_garut_schema.sql` and `docs/schema-baseline/0001_tighten_visitor_privileges.sql`; why: the source repo carried no migrations, so those files are the schema of record.
- The Drizzle migration set starts with the full schema (`0000_nempo_garut_schema`) applied to this project's fresh database; every new migration must only add or change things; why: the baseline already exists in the database.
- CMS admins are granted only by the `on_auth_user_confirmed_grant_admin` trigger when a verified email matches `admin_allowlist`, or by an existing admin; the CMS login offers activate (sign up + verify) and password reset; why: migrated admins get new auth IDs and must prove email ownership before receiving access.
- Media pointers under `src/assets/` must belong to this project's own storage (re-upload with `lovable-assets create` when bringing files from another project); why: a foreign project's pointer breaks once published.
- Page-level routing inside the NEMPO app goes through `src/lib/wouter.tsx`, a wouter-compatible API backed by TanStack Router; why: keeps one router without rewriting every page. New pages are added to the `Switch` in `src/nempo-app.tsx`.
- tsconfig strict extras (noUncheckedIndexedAccess, exactOptionalPropertyTypes, etc.) are off; why: the imported code was written without them.
- Lazily loaded pages and apps use `lazyWithRetry` from `src/lib/lazy-with-retry.ts` instead of React `lazy`; why: a page file that fails to load after an update otherwise blanks the whole screen — it retries once, then reloads once. Do not call preventDefault on Vite's `vite:preloadError`; it makes the import resolve empty and React crashes with a blank screen.
- Lock CMS and backup pages off published domains (preview only); why: owner wants only the organizer site live. Implemented in src/lib/hosting-lock.ts via Start request middleware.
- Some subdirectories have their own `AGENTS.md` (`src/apps/`); read the nearest one before changing files there; why: those rules are scoped to that folder.
