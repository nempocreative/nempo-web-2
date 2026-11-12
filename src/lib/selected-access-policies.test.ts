import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { interestOptions, originOptions } from "../data/community-recruitment";

const migration = readFileSync(resolve(process.cwd(), "drizzle/migrations/0002_restrict_selected_public_access_policies.sql"), "utf8");

describe("selected public access policy regression", () => {
  it("validates submissions while retaining the existing form choices", () => {
    expect(migration).toContain('ALTER POLICY "Anyone can apply"');
    expect(migration).toContain("char_length(btrim(full_name)) BETWEEN 3 AND 100");
    expect(migration).toContain("char_length(coalesce(reason, '')) <= 1000");
    for (const option of [...interestOptions, ...originOptions]) expect(migration).toContain(`'${option}'`);
    expect(migration).not.toMatch(/WITH CHECK\s*\(true\)/i);
  });

  it("removes public settings access without modifying administrator policies", () => {
    expect(migration).toContain('DROP POLICY "Public can read site_settings"');
    expect(migration).toContain("REVOKE SELECT ON public.site_settings FROM anon");
    expect(migration).not.toMatch(/(?:DROP|ALTER) POLICY "Admins/);
  });

  it("only exposes active ticket types for active parent events", () => {
    expect(migration).toContain("active IS TRUE");
    expect(migration).toContain("event.id = event_tickets.event_id AND event.active IS TRUE");
    expect(migration).not.toMatch(/USING\s*\(true\)/i);
  });
});