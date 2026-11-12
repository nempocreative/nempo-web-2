import { describe, expect, it } from "vitest";
import { shouldBlock } from "./hosting-lock";

describe("hosting lock", () => {
  it("blocks CMS on a published domain", () => expect(shouldBlock("nempo.id", "/cms/login")).toBe(true));
  it("blocks the backup page on lovable.app", () => expect(shouldBlock("nempo.lovable.app", "/backup")).toBe(true));
  it("keeps the organizer site public", () => expect(shouldBlock("nempo.id", "/wisata")).toBe(false));
  it("allows CMS in the editor preview", () =>
    expect(shouldBlock("id-preview--abc.lovable.app", "/cms")).toBe(false));
});
