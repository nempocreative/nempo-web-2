import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import fallback from "@/assets/merch-gelang-exterior.jpg";

export function BraceletSpinner() {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [isPaused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    import("three").then((T) => {
      if (disposed) return;
      const css = getComputedStyle(el);
      const navy = css.getPropertyValue("--bracelet-band").trim();
      const ink = css.getPropertyValue("--bracelet-letter").trim();
      const blue = css.getPropertyValue("--bracelet-blue").trim();
      const violet = css.getPropertyValue("--bracelet-violet").trim();
      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-label", "Gelang 3D Nempo dan Kala Muda, kedua tulisan di sisi luar");
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 1.6, 9.8);
      camera.lookAt(0, 0, 0);
      scene.add(new T.HemisphereLight(ink, navy, 2));
      const light = new T.DirectionalLight(ink, 3);
      light.position.set(3, 5, 4); scene.add(light);
      const canvas = document.createElement("canvas");
      canvas.width = 4096; canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (!ctx) { renderer.dispose(); renderer.domElement.remove(); return; }
      ctx.fillStyle = navy; ctx.fillRect(0, 0, 4096, 256);
      const stripe = ctx.createLinearGradient(0, 0, 4096, 0);
      stripe.addColorStop(0, blue); stripe.addColorStop(.5, violet); stripe.addColorStop(1, blue);
      ctx.fillStyle = stripe; ctx.fillRect(0, 14, 4096, 12); ctx.fillRect(0, 230, 4096, 12);
      ctx.fillStyle = ink; ctx.font = "bold 112px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      // Match texture pixels to physical arc length so glyphs keep their aspect ratio.
      const textScaleX = (4096 / (Math.PI * 4)) / (256 / .55);
      const drawLettering = (target: CanvasRenderingContext2D) => {
        for (const [label, x] of [["nempo", 1024], ["KALA MUDA", 3072]] as const) {
          target.save(); target.translate(x, 142); target.scale(textScaleX, 1);
          target.fillText(label, 0, 0); target.restore();
        }
      };
      drawLettering(ctx);
      const texture = new T.CanvasTexture(canvas); texture.colorSpace = T.SRGBColorSpace;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      const reliefCanvas = document.createElement("canvas");
      reliefCanvas.width = 4096; reliefCanvas.height = 256;
      const reliefCtx = reliefCanvas.getContext("2d");
      if (reliefCtx) {
        reliefCtx.fillStyle = "#000000"; reliefCtx.fillRect(0, 0, 4096, 256);
        reliefCtx.fillStyle = "#ffffff"; reliefCtx.font = ctx.font; reliefCtx.textAlign = "center"; reliefCtx.textBaseline = "middle";
        drawLettering(reliefCtx);
      }
      const relief = new T.CanvasTexture(reliefCanvas);
      const outer = new T.MeshStandardMaterial({ map: texture, bumpMap: relief, bumpScale: .018, roughness: .48 });
      const inner = new T.MeshStandardMaterial({ color: navy, roughness: .7, side: T.BackSide });
      const rim = new T.MeshStandardMaterial({ color: navy, roughness: .6, side: T.DoubleSide });
      const band = new T.Group();
      band.add(new T.Mesh(new T.CylinderGeometry(2, 2, .55, 160, 1, true), outer));
      band.add(new T.Mesh(new T.CylinderGeometry(1.9, 1.9, .55, 160, 1, true), inner));
      for (const sign of [-1, 1]) {
        const profile = [];
        for (let j = 0; j <= 16; j++) {
          const a = Math.PI * j / 16;
          profile.push(new T.Vector2(1.95 + .05 * Math.cos(a), sign * (.275 + .045 * Math.sin(a))));
        }
        band.add(new T.Mesh(new T.LatheGeometry(profile, 160), rim));
      }
      // Level wristband: only yaw changes, never pitch or roll.
      band.rotation.set(0, -Math.PI / 2, 0);
      const turntable = new T.Group();
      turntable.add(band); scene.add(turntable);
      const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); };
      const ro = new ResizeObserver(resize); ro.observe(el); resize();
      let last = performance.now(), raf = 0, dragX: number | null = null;
      const reduce = matchMedia("(prefers-reduced-motion: reduce)");
      const tick = (now: number) => {
        const dt = Math.min(.05, (now - last) / 1000); last = now;
        if (!paused.current && !reduce.matches && dragX === null) turntable.rotation.y += dt * .65;
        renderer.render(scene, camera); el.dataset.sceneReady = "true"; raf = requestAnimationFrame(tick);
      };
      const down = (e: PointerEvent) => { dragX = e.clientX; el.setPointerCapture(e.pointerId); };
      const move = (e: PointerEvent) => { if (dragX === null) return; turntable.rotation.y += (e.clientX - dragX) * .012; dragX = e.clientX; };
      const up = () => { dragX = null; };
      el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move);
      el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
      raf = requestAnimationFrame(tick); setReady(true);
      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up);
        band.children.forEach((child) => { if (child instanceof T.Mesh) child.geometry.dispose(); });
        texture.dispose(); relief.dispose(); outer.dispose(); inner.dispose(); rim.dispose(); renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);
  return <div className="bracelet-display bg-card relative flex flex-col justify-center">
    <div ref={host} className="relative aspect-square w-full touch-pan-y cursor-grab overflow-hidden" style={{ maxWidth: 400, marginInline: "auto" }}>
      {!ready && <img src={fallback} alt="Gelang Nempo × Kala Muda, tulisan pada sisi luar" width={1024} height={1024} className="h-full w-full object-contain" />}
    </div>
    {ready && <Button variant="outline" size="icon" className="absolute bottom-5 right-5" title={isPaused ? "Putar gelang" : "Jeda putaran gelang"} aria-label={isPaused ? "Putar gelang" : "Jeda putaran gelang"} onClick={() => { paused.current = !paused.current; setPaused(paused.current); }}>{isPaused ? <Play /> : <Pause />}</Button>}
  </div>;
}