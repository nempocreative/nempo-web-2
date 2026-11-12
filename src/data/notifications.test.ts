import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { notificationItems } from "./notifications";

const routeSource = readFileSync(resolve(process.cwd(), "src/nempo-app.tsx"), "utf8");
const registeredPaths = [...routeSource.matchAll(/<Route path="([^"]+)"/g)].map((m) => m[1]);

describe("isi notifikasi", () => {
  it("hanya tiga: ajakan join, buat event, cek medsos", () => {
    expect(notificationItems).toHaveLength(3);
    const titles = notificationItems.map((n) => n.title.toLowerCase()).join(" | ");
    expect(titles).toContain("join");
    expect(titles).toContain("acara");
    expect(titles).toContain("medsos");
  });

  it("setiap tautan menunjuk halaman yang terdaftar", () => {
    for (const item of notificationItems) {
      expect(registeredPaths).toContain(item.href.split("#", 1)[0]);
    }
  });
});
