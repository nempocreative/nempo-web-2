import cover01 from "@/assets/invitation-covers/nempo-01.jpg";
import cover02 from "@/assets/invitation-covers/nempo-02.jpg";
import cover03 from "@/assets/invitation-covers/nempo-03.jpg";
import cover04 from "@/assets/invitation-covers/nempo-04.jpg";
import cover05 from "@/assets/invitation-covers/nempo-05.jpg";
import cover06 from "@/assets/invitation-covers/nempo-06.jpg";
import cover07 from "@/assets/invitation-covers/nempo-07.jpg";
import cover08 from "@/assets/invitation-covers/nempo-08.jpg";
import cover09 from "@/assets/invitation-covers/nempo-09.jpg";
import cover10 from "@/assets/invitation-covers/nempo-10.jpg";
import cover11 from "@/assets/invitation-covers/nempo-11.jpg";
import cover12 from "@/assets/invitation-covers/nempo-12.jpg";
import cover13 from "@/assets/invitation-covers/nempo-13.jpg";
import cover14 from "@/assets/invitation-covers/nempo-14.jpg";
import cover15 from "@/assets/invitation-covers/nempo-15.jpg";
import cover16 from "@/assets/invitation-covers/nempo-16.jpg";
import type { InvitationTheme } from "@/data/invitation-themes";

// Captures of the actual closed invitations at 390 × 780, not generic mockups.
const covers: Record<string, string> = {
  "NEMPO 01": cover01, "NEMPO 02": cover02,
  "NEMPO 03": cover03, "NEMPO 04": cover04,
  "NEMPO 05": cover05, "NEMPO 06": cover06,
  "NEMPO 07": cover07, "NEMPO 08": cover08,
  "NEMPO 09": cover09, "NEMPO 10": cover10,
  "NEMPO 11": cover11, "NEMPO 12": cover12,
  "NEMPO 13": cover13, "NEMPO 14": cover14,
  "NEMPO 15": cover15, "NEMPO 16": cover16,
};

export function InvitationCoverPreview({ theme }: { theme: InvitationTheme }) {
  const cover = covers[theme.code];
  if (!cover) return null;
  return (
    <div className="relative aspect-[1/2] w-full overflow-hidden border-b border-border bg-muted">
      <img
        src={cover}
        alt={`Sampul undangan ${theme.code} — ${theme.name}`}
        width={390}
        height={780}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-contain"
      />
      <span className="absolute left-2 top-2 rounded-sm border border-border bg-background/95 px-2 py-1 text-[10px] font-semibold text-foreground shadow-sm">
        {theme.code}
      </span>
    </div>
  );
}