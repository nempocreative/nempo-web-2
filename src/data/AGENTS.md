# Rules for `src/data/`

Browser-safe data modules. Pages read these directly, so nothing here may
import a browser-only library or hit the network at module load.

- Graphic design prices and monthly limits live in `src/data/design-creative.ts`; WCC and LO packages live in dedicated browser-safe data modules shown on their parent Wedding/EO pages; why: each service and its rule tests share one authoritative price source.
- Current website packages, additional fees, exclusions and package-specific consultation links live in `src/data/web-development.ts`, separate from legacy digital services and business-system plans; why: website price updates must not silently change other service pages.
- Social-media portfolio collections live in browser-safe data with separate original image sets per tone and a shared gallery component; why: category covers, nine-post grids, and enlarged posts stay consistent without CSS recoloring.
- Nempo Buddy's chat answers and service matching live in browser-safe `src/data/buddy-chat.ts` with routing tests; why: update chat content without replacing the restored widget or changing other modes.
- Rows the site must always have (the MusiComedy Night event) live in browser-safe `src/data/event-seed.ts` with an insert-if-missing `eventSeedInsertSql` and are re-applied after a remix; why: restoring the missing database row fixes listing, detail and ticket reads without duplicating events or overwriting CMS edits.
- The media archive record is rebuilt from `src/data/media-archive.json` as a plain INSERT while `public.media_archive` is empty (the sandbox session has no UPDATE grant there); why: git sync carries code but no rows, so the record of every recovered file must be re-appliable from one repo file.
