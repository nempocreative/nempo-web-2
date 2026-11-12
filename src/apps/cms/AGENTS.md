# Rules for `src/apps/cms/` (the `/cms` back-office)

- The `/cms` back-office reads and writes Lovable Cloud tables directly through `src/apps/cms/lib/api.ts`, signs in with email/password, and only admits users with an `admin` row in `user_roles` (enforced by RLS via `has_role`); why: the old external Garut API no longer exists and client-side gates cannot protect data.
