/** Server-only access codes for locked program proposals. Never import from browser code. */
const KODE_PROGRAM: Record<string, string> = {
  "pasar-seni-garut": "121212",
};

export function cocokkanKodeProgram(program: string, kode: string): boolean {
  const benar = KODE_PROGRAM[program];
  if (!benar) return false;
  const dicoba = kode.trim();
  if (dicoba.length !== benar.length) return false;
  let beda = 0;
  for (let i = 0; i < benar.length; i++) beda |= benar.charCodeAt(i) ^ dicoba.charCodeAt(i);
  return beda === 0;
}
