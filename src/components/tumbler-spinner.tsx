import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import nempoLogo from "@/assets/nempo-bumper-logo-white.png";
import kalaMudaLogo from "@/assets/kala-muda-logo.png";

const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

// Deterministic pseudo-random so the powder-coat speckle is identical on every load.
const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

export function TumblerSpinner() {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [isPaused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    Promise.all([
      import("three"),
      import("three/examples/jsm/environments/RoomEnvironment.js"),
      loadImage(nempoLogo),
      loadImage(kalaMudaLogo),
    ]).then(([T, { RoomEnvironment }, nempo, kala]) => {
      if (disposed) return;
      const css = getComputedStyle(el);
      const navy = css.getPropertyValue("--tumbler-body").trim();
      const deep = css.getPropertyValue("--tumbler-lid").trim();
      const ink = css.getPropertyValue("--tumbler-letter").trim();
      const blue = css.getPropertyValue("--tumbler-blue").trim();
      const violet = css.getPropertyValue("--tumbler-violet").trim();
      const metal = css.getPropertyValue("--tumbler-metal").trim();
      const shadowInk = css.getPropertyValue("--tumbler-shadow").trim();

      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-label", "Tumbler 3D Nempo dan Kala Muda");

      const scene = new T.Scene();
      const pmrem = new T.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 0.6;
      const camera = new T.PerspectiveCamera(30, 3 / 4, 0.1, 100);
      camera.position.set(0, 2.6, 7.6);
      camera.lookAt(0, 1.5, 0);
      const key = new T.DirectionalLight(ink, 2.0);
      key.position.set(3, 5, 6); scene.add(key);
      const rimLight = new T.DirectionalLight(violet, 1.1);
      rimLight.position.set(-5, 2, -4); scene.add(rimLight);

      const textures: InstanceType<typeof T.Texture>[] = [];
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const toTexture = (canvas: HTMLCanvasElement) => {
        const t = new T.CanvasTexture(canvas);
        t.colorSpace = T.SRGBColorSpace; t.anisotropy = maxAniso;
        textures.push(t); return t;
      };

      // ---- Tapered 600 ml tumbler body: profile from the base up to the steel lip.
      const BODY_H = 2.6, R_BOT = 0.53, R_TOP = 0.62;
      const profile: InstanceType<typeof T.Vector2>[] = [];
      profile.push(new T.Vector2(0.44, 0), new T.Vector2(0.49, 0.015), new T.Vector2(0.515, 0.045));
      for (let i = 0; i <= 24; i++) {
        const y = 0.08 + (BODY_H - 0.08) * (i / 24);
        profile.push(new T.Vector2(R_BOT + (R_TOP - R_BOT) * (y / BODY_H), y));
      }

      // Wrap print: aspect follows circumference × height so lettering is not stretched.
      const circ = 2 * Math.PI * ((R_BOT + R_TOP) / 2);
      const TW = 2048, TH = Math.round(TW * (BODY_H / circ));
      const wrap = document.createElement("canvas"); wrap.width = TW; wrap.height = TH;
      const wc = wrap.getContext("2d");
      if (!wc) { renderer.dispose(); renderer.domElement.remove(); return; }
      wc.fillStyle = navy; wc.fillRect(0, 0, TW, TH);
      const r = rng(11);
      for (let i = 0; i < 9000; i++) {
        wc.fillStyle = r() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.12)";
        wc.fillRect(r() * TW, r() * TH, 2, 2);
      }
      const grad = wc.createLinearGradient(0, 0, TW, 0);
      grad.addColorStop(0, blue); grad.addColorStop(0.25, violet); grad.addColorStop(0.5, blue);
      grad.addColorStop(0.75, violet); grad.addColorStop(1, blue);
      // Seamless wave band round the lower body (whole number of periods around).
      const wave = (base: number, amp: number, periods: number, phase: number) => {
        wc.beginPath(); wc.moveTo(0, TH);
        for (let x = 0; x <= TW; x += 8) wc.lineTo(x, base + amp * Math.sin((x / TW) * Math.PI * 2 * periods + phase));
        wc.lineTo(TW, TH); wc.closePath();
      };
      wc.globalAlpha = 0.45; wc.fillStyle = grad; wave(TH * 0.7, 26, 3, 1.2); wc.fill();
      wc.globalAlpha = 1; wave(TH * 0.78, 20, 2, 0); wc.fill();
      wc.fillStyle = navy; wc.fillRect(0, TH - 26, TW, 26);
      wc.fillStyle = grad; wc.fillRect(0, 34, TW, 8); wc.fillRect(0, TH - 34, TW, 6);

      // u = 0 faces the viewer at rest: Nempo logo centred there (split across the seam).
      const drawWrapped = (img: CanvasImageSource, cx: number, y: number, w: number, h: number) => {
        for (const off of [-TW, 0, TW]) wc.drawImage(img, cx + off - w / 2, y, w, h);
      };
      if (nempo) {
        const lw = TW * 0.26, lh = lw * (nempo.height / nempo.width);
        drawWrapped(nempo, 0, TH * 0.16, lw, lh);
      }
      wc.textAlign = "center"; wc.textBaseline = "middle"; wc.fillStyle = ink;
      wc.font = "bold 34px Arial"; wc.letterSpacing = "10px"; wc.globalAlpha = 0.85;
      for (const off of [0, TW]) wc.fillText("NEMPO × KALA MUDA", off + 5, TH * 0.6);
      wc.globalAlpha = 1; wc.letterSpacing = "0px";
      // Opposite side: Kala Muda logo.
      if (kala) {
        const lw = TW * 0.24, lh = lw * (kala.height / kala.width);
        wc.drawImage(kala, TW * 0.5 - lw / 2, TH * 0.36 - lh / 2, lw, lh);
      }
      wc.font = "bold 30px Arial"; wc.letterSpacing = "8px"; wc.globalAlpha = 0.8;
      wc.fillText("@nempo.id  ·  @kalamudacom", TW * 0.5 + 4, TH * 0.52);
      wc.globalAlpha = 1; wc.letterSpacing = "0px";
      // Sides: vertical "n" emblems.
      if (nempo) {
        const sx = nempo.width * 0.326, sy = nempo.height * 0.081, sw = nempo.width * 0.337, sh = nempo.height * 0.554;
        const dw = TW * 0.06, dh = dw * (sh / sw);
        wc.globalAlpha = 0.5;
        for (const u of [0.25, 0.75]) wc.drawImage(nempo, sx, sy, sw, sh, TW * u - dw / 2, TH * 0.32, dw, dh);
        wc.globalAlpha = 1;
      }
      const wrapTex = toTexture(wrap);

      const bodyMat = new T.MeshPhysicalMaterial({ map: wrapTex, roughness: 0.5, metalness: 0.15, clearcoat: 0.7, clearcoatRoughness: 0.35 });
      const body = new T.Mesh(new T.LatheGeometry(profile, 128), bodyMat);
      const base = new T.Mesh(new T.CircleGeometry(0.445, 64), new T.MeshStandardMaterial({ color: deep, roughness: 0.6 }));
      base.rotation.x = Math.PI / 2;

      // Polished steel lip.
      const chrome = new T.MeshStandardMaterial({ color: metal, metalness: 1, roughness: 0.18 });
      const lip = new T.Mesh(new T.LatheGeometry([
        new T.Vector2(R_TOP - 0.002, BODY_H - 0.005), new T.Vector2(R_TOP + 0.008, BODY_H + 0.01),
        new T.Vector2(R_TOP + 0.01, BODY_H + 0.16), new T.Vector2(R_TOP + 0.002, BODY_H + 0.175),
      ], 128), chrome);

      // Press-on lid with a soft rounded crown.
      const LID_Y = BODY_H + 0.17;
      const lidPts = [
        new T.Vector2(R_TOP + 0.02, LID_Y), new T.Vector2(R_TOP + 0.035, LID_Y + 0.03),
        new T.Vector2(R_TOP + 0.035, LID_Y + 0.17), new T.Vector2(R_TOP + 0.015, LID_Y + 0.22),
        new T.Vector2(R_TOP - 0.06, LID_Y + 0.24), new T.Vector2(0.3, LID_Y + 0.25), new T.Vector2(0, LID_Y + 0.25),
      ];
      const lidMat = new T.MeshPhysicalMaterial({ color: deep, roughness: 0.42, clearcoat: 0.5 });
      const lid = new T.Mesh(new T.LatheGeometry(lidPts, 128), lidMat);
      // Gradient trim ring around the lid.
      const [trim, tc] = (() => { const c = document.createElement("canvas"); c.width = 512; c.height = 8; return [c, c.getContext("2d")] as const; })();
      if (tc) {
        const g = tc.createLinearGradient(0, 0, 512, 0);
        g.addColorStop(0, blue); g.addColorStop(0.5, violet); g.addColorStop(1, blue);
        tc.fillStyle = g; tc.fillRect(0, 0, 512, 8);
      }
      const trimRing = new T.Mesh(
        new T.CylinderGeometry(R_TOP + 0.038, R_TOP + 0.038, 0.035, 128, 1, true),
        new T.MeshStandardMaterial({ map: toTexture(trim), roughness: 0.35, metalness: 0.3 }),
      );
      trimRing.position.y = LID_Y + 0.1;

      // Sip spout at the front and a folding steel carry loop on top.
      const spout = new T.Mesh(new T.CapsuleGeometry(0.06, 0.22, 6, 16), new T.MeshStandardMaterial({ color: "#05070f", roughness: 0.5 }));
      spout.rotation.z = Math.PI / 2;
      spout.scale.set(1, 1, 0.6);
      spout.position.set(0, LID_Y + 0.255, R_TOP - 0.2);
      const loop = new T.Mesh(new T.TorusGeometry(0.2, 0.035, 14, 40, Math.PI), chrome);
      loop.position.set(0, LID_Y + 0.25, -0.12);
      const hinges = [-0.2, 0.2].map((x) => {
        const h = new T.Mesh(new T.CylinderGeometry(0.055, 0.055, 0.06, 20), lidMat);
        h.rotation.z = Math.PI / 2; h.position.set(x, LID_Y + 0.265, -0.12); return h;
      });

      const tumbler = new T.Group();
      tumbler.add(body, base, lip, lid, trimRing, spout, loop, ...hinges);
      const turntable = new T.Group();
      turntable.add(tumbler); scene.add(turntable);

      // Soft contact shadow (stays put while the tumbler turns).
      const sh = document.createElement("canvas"); sh.width = sh.height = 128;
      const shc = sh.getContext("2d");
      if (shc) {
        const g = shc.createRadialGradient(64, 64, 4, 64, 64, 64);
        g.addColorStop(0, shadowInk); g.addColorStop(1, "transparent");
        shc.fillStyle = g; shc.fillRect(0, 0, 128, 128);
      }
      const shadow = new T.Mesh(new T.PlaneGeometry(1.9, 1.9), new T.MeshBasicMaterial({ map: toTexture(sh), transparent: true, depthWrite: false }));
      shadow.rotation.x = -Math.PI / 2; shadow.position.y = -0.005;
      scene.add(shadow);

      const resize = () => {
        const wpx = el.clientWidth, hpx = el.clientHeight;
        renderer.setSize(wpx, hpx); camera.aspect = wpx / hpx; camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();
      let last = performance.now(), raf = 0, dragX: number | null = null;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)");
      const tick = (now: number) => {
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        // Pure yaw at a constant speed: no sway, bob or tilt.
        if (!paused.current && !reduce.matches && dragX === null) turntable.rotation.y += dt * 0.65;
        renderer.render(scene, camera); el.dataset.sceneReady = "true";
        raf = requestAnimationFrame(tick);
      };
      const down = (e: PointerEvent) => { dragX = e.clientX; el.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => { if (dragX === null) return; turntable.rotation.y += (e.clientX - dragX) * 0.012; dragX = e.clientX; };
      const up = () => { dragX = null; };
      el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
      raf = requestAnimationFrame(tick); setReady(true);
      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
        const geos = new Set<{ dispose: () => void }>();
        const mats = new Set<{ dispose: () => void }>();
        scene.traverse((o) => {
          if (o instanceof T.Mesh) {
            geos.add(o.geometry);
            (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => mats.add(m));
          }
        });
        geos.forEach((g) => g.dispose()); mats.forEach((m) => m.dispose());
        textures.forEach((x) => x.dispose()); envTex.dispose(); pmrem.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="tumbler-display bg-card relative flex flex-col justify-center py-6">
      <div ref={host} className="relative aspect-[3/4] w-full touch-pan-y cursor-grab overflow-hidden" style={{ maxWidth: 340, marginInline: "auto" }}>
        {!ready && <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">Memuat tumbler 3D…</div>}
      </div>
      {ready && (
        <Button
          variant="outline" size="icon"
          title={isPaused ? "Putar tumbler" : "Jeda putaran tumbler"}
          aria-label={isPaused ? "Putar tumbler" : "Jeda putaran tumbler"}
          onClick={() => { paused.current = !paused.current; setPaused(paused.current); }}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      )}
    </div>
  );
}
