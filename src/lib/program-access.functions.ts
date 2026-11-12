import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const masukan = z.object({
  program: z.string().min(1).max(60),
  kode: z.string().max(40),
});

/** Checks a program proposal's access code on the server so the code never ships to browsers. */
export const bukaProposalProgram = createServerFn({ method: "POST" })
  .inputValidator((data: { program: string; kode: string }) => masukan.parse(data))
  .handler(async ({ data }) => {
    const { cocokkanKodeProgram } = await import("./program-access.server");
    const ok = cocokkanKodeProgram(data.program, data.kode);
    if (!ok) await new Promise((r) => setTimeout(r, 500)); // slow down guessing
    return { ok };
  });
