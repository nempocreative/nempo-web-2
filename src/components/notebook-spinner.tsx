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

// Deterministic pseudo-random so the linen grain is identical on every load.
const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

export function NotebookSpinner() {
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
      const navy = css.getPropertyValue("--notebook-cover").trim();
      const deep = css.getPropertyValue("--notebook-deep").trim();
      const ink = css.getPropertyValue("--notebook-letter").trim();
      const blue = css.getPropertyValue("--notebook-blue").trim();
      const violet = css.getPropertyValue("--notebook-violet").trim();
      const paper = css.getPropertyValue("--notebook-paper").trim();
      const paperEdge = css.getPropertyValue("--notebook-paper-edge").trim();

      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-label", "Buku notes 3D Nempo dan Kala Muda");

      const scene = new T.Scene();
      const pmrem = new T.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 0.5;
      const camera = new T.PerspectiveCamera(30, 3 / 4, 0.1, 100);
      camera.position.set(0, 1.0, 6.3);
      camera.lookAt(0, -0.18, 0);
      const key = new T.DirectionalLight(ink, 2.1);
      key.position.set(3, 4, 6); scene.add(key);
      const fill = new T.DirectionalLight(violet, 0.7);
      fill.position.set(-4, 1, -3); scene.add(fill);

      const textures: InstanceType<typeof T.Texture>[] = [];
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const toTexture = (canvas: HTMLCanvasElement) => {
        const t = new T.CanvasTexture(canvas);
        t.colorSpace = T.SRGBColorSpace; t.anisotropy = maxAniso;
        textures.push(t); return t;
      };
      const canvas = (w: number, h: number) => {
        const c = document.createElement("canvas"); c.width = w; c.height = h;
        return [c, c.getContext("2d") as CanvasRenderingContext2D] as const;
      };

      // ---- A5 hardcover proportions (148 × 210 mm), spine on the left of the front cover.
      const W = 1.48, H = 2.1, BOARD = 0.035, PAGES = 0.2, R = 0.11;
      const S = 600; // texture px per unit
      const CWpx = Math.round(W * S), CHpx = Math.round(H * S);

      const linen = (c: CanvasRenderingContext2D, w: number, h: number, seed: number) => {
        c.fillStyle = navy; c.fillRect(0, 0, w, h);
        const r = rng(seed);
        c.lineWidth = 1;
        for (let i = 0; i < 2600; i++) {
          c.strokeStyle = r() > 0.5 ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.08)";
          const x = r() * w, y = r() * h, l = 6 + r() * 18;
          c.beginPath();
          if (r() > 0.5) { c.moveTo(x, y); c.lineTo(x + l, y); } else { c.moveTo(x, y); c.lineTo(x, y + l); }
          c.stroke();
        }
      };
      const vGrad = (c: CanvasRenderingContext2D, h: number) => {
        const g = c.createLinearGradient(0, 0, 0, h);
        g.addColorStop(0, blue); g.addColorStop(1, violet); return g;
      };
      const emblem = (c: CanvasRenderingContext2D, x: number, y: number, dw: number, alpha: number) => {
        if (!nempo) return;
        const sx = nempo.width * 0.326, sy = nempo.height * 0.081, sw = nempo.width * 0.337, sh = nempo.height * 0.554;
        c.globalAlpha = alpha; c.drawImage(nempo, sx, sy, sw, sh, x, y, dw, dw * (sh / sw)); c.globalAlpha = 1;
      };

      // Front cover: linen navy, gradient band along the spine, large Nempo logo, NOTES title.
      const [front, fc] = canvas(CWpx, CHpx);
      linen(fc, CWpx, CHpx, 7);
      const band = CWpx * 0.15;
      fc.fillStyle = vGrad(fc, CHpx); fc.fillRect(0, 0, band, CHpx);
      fc.fillStyle = ink; fc.globalAlpha = 0.7; fc.fillRect(band, 0, 4, CHpx); fc.globalAlpha = 1;
      const cx = band + (CWpx - band) / 2;
      if (nempo) {
        const lw = (CWpx - band) * 0.7, lh = lw * (nempo.height / nempo.width);
        fc.drawImage(nempo, cx - lw / 2, CHpx * 0.17, lw, lh);
      }
      fc.textAlign = "center"; fc.textBaseline = "middle";
      fc.fillStyle = ink; fc.font = "bold 74px Arial";
      fc.letterSpacing = "22px"; fc.fillText("NOTES", cx + 11, CHpx * 0.6); fc.letterSpacing = "0px";
      fc.fillStyle = vGrad(fc, CHpx); fc.fillRect(cx - 70, CHpx * 0.6 + 62, 140, 6);
      fc.fillStyle = ink; fc.globalAlpha = 0.75; fc.font = "bold 26px Arial";
      fc.letterSpacing = "6px"; fc.fillText("NEMPO × KALA MUDA", cx + 3, CHpx * 0.6 + 112); fc.letterSpacing = "0px";
      fc.globalAlpha = 1;
      if (kala) {
        const lw = (CWpx - band) * 0.42, lh = lw * (kala.height / kala.width);
        fc.drawImage(kala, cx - lw / 2, CHpx * 0.88 - lh / 2, lw, lh);
      }

      // Back cover (as seen from behind, the spine is on the right).
      const [back, bc] = canvas(CWpx, CHpx);
      linen(bc, CWpx, CHpx, 19);
      bc.fillStyle = vGrad(bc, CHpx); bc.fillRect(CWpx - band, 0, band, CHpx);
      bc.fillStyle = ink; bc.globalAlpha = 0.7; bc.fillRect(CWpx - band - 4, 0, 4, CHpx); bc.globalAlpha = 1;
      const bx = (CWpx - band) / 2;
      emblem(bc, bx - CWpx * 0.2, CHpx * 0.3, CWpx * 0.4, 0.9);
      bc.textAlign = "center"; bc.textBaseline = "middle"; bc.fillStyle = ink;
      bc.font = "bold 28px Arial"; bc.letterSpacing = "6px";
      bc.fillText("NEMPO × KALA MUDA", bx + 3, CHpx * 0.82); bc.letterSpacing = "0px";
      bc.globalAlpha = 0.7; bc.font = "24px Arial";
      bc.fillText("@nempo.id  ·  @kalamudacom", bx, CHpx * 0.82 + 48); bc.globalAlpha = 1;

      // Spine: gradient wrap continuing the cover band, lettering reads top to bottom.
      const [spine, sc] = canvas(200, CHpx);
      sc.fillStyle = vGrad(sc, CHpx); sc.fillRect(0, 0, 200, CHpx);
      sc.save(); sc.translate(100, CHpx / 2); sc.rotate(Math.PI / 2);
      sc.fillStyle = ink; sc.textAlign = "center"; sc.textBaseline = "middle";
      sc.font = "bold 46px Arial"; sc.letterSpacing = "8px"; sc.fillText("NEMPO × KALA MUDA", 4, 0);
      sc.restore();

      // Page block edge: fine stacked page lines.
      const [lines, lc] = canvas(2, 6);
      lc.fillStyle = paper; lc.fillRect(0, 0, 2, 6);
      lc.fillStyle = paperEdge; lc.fillRect(0, 4, 2, 2);
      const lineTex = toTexture(lines);
      lineTex.wrapS = lineTex.wrapT = T.RepeatWrapping; lineTex.repeat.set(1, 300);

      const frontTex = toTexture(front);
      frontTex.repeat.set(1 / W, 1 / H); frontTex.offset.set(0.5, 0.5);
      const backTex = toTexture(back);
      backTex.repeat.set(-1 / W, 1 / H); backTex.offset.set(0.5, 0.5);

      // Board outline: square on the spine side, rounded on the opening side.
      const boardShape = (w: number, h: number, r: number) => {
        const s = new T.Shape();
        s.moveTo(-w / 2, -h / 2);
        s.lineTo(w / 2 - r, -h / 2);
        s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
        s.lineTo(w / 2, h / 2 - r);
        s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
        s.lineTo(-w / 2, h / 2);
        s.closePath();
        return s;
      };
      const boardGeo = new T.ExtrudeGeometry(boardShape(W, H, R), {
        depth: BOARD, bevelEnabled: true, bevelThickness: 0.008, bevelSize: 0.008, bevelSegments: 3, curveSegments: 12,
      });
      const edgeMat = new T.MeshStandardMaterial({ color: deep, roughness: 0.7 });
      const frontBoard = new T.Mesh(boardGeo, [new T.MeshStandardMaterial({ map: frontTex, roughness: 0.62 }), edgeMat]);
      frontBoard.position.z = PAGES / 2;
      const backBoard = new T.Mesh(boardGeo, [new T.MeshStandardMaterial({ map: backTex, roughness: 0.62 }), edgeMat]);
      backBoard.position.z = -PAGES / 2 - BOARD;

      const pageGeo = new T.ExtrudeGeometry(boardShape(W - 0.06, H - 0.07, R - 0.03), { depth: PAGES, bevelEnabled: false, curveSegments: 12 });
      const pages = new T.Mesh(pageGeo, [
        new T.MeshStandardMaterial({ color: paper, roughness: 0.9 }),
        new T.MeshStandardMaterial({ map: lineTex, roughness: 0.9 }),
      ]);
      pages.position.set(-0.03, 0, -PAGES / 2);

      // Rounded spine wrapping the left edge.
      const spineR = PAGES / 2 + BOARD + 0.008;
      const spineGeo = new T.CylinderGeometry(spineR, spineR, H + 0.016, 40, 1, false, Math.PI, Math.PI);
      const spineMesh = new T.Mesh(spineGeo, [new T.MeshStandardMaterial({ map: toTexture(spine), roughness: 0.6 }), edgeMat, edgeMat]);
      spineMesh.scale.x = 0.32;
      spineMesh.position.x = -W / 2;

      // Elastic closure band near the opening edge (wraps front, top, back and bottom).
      const [elastic, ec] = canvas(8, 256);
      ec.fillStyle = vGrad(ec, 256); ec.fillRect(0, 0, 8, 256);
      const elasticMat = new T.MeshStandardMaterial({ map: toTexture(elastic), roughness: 0.45 });
      const strap = new T.Mesh(new T.BoxGeometry(0.075, H + 0.04, PAGES + 2 * BOARD + 0.04), elasticMat);
      strap.position.x = W / 2 - 0.2;

      // Ribbon bookmark hanging from the page block.
      const ribbonMat = new T.MeshStandardMaterial({ color: violet, roughness: 0.5, side: T.DoubleSide });
      const ribbon = new T.Mesh(new T.BoxGeometry(0.06, 0.5, 0.006), ribbonMat);
      ribbon.position.set(0.12, -H / 2 - 0.2, 0.02);

      const book = new T.Group();
      book.add(frontBoard, backBoard, pages, spineMesh, strap, ribbon);
      book.position.y = 0.05;
      const turntable = new T.Group();
      turntable.rotation.y = -0.35;
      turntable.add(book); scene.add(turntable);

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
        scene.traverse((o) => {
          if (o instanceof T.Mesh) {
            geos.add(o.geometry);
            (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
          }
        });
        geos.forEach((g) => g.dispose());
        textures.forEach((x) => x.dispose()); envTex.dispose(); pmrem.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="notebook-display bg-card relative flex flex-col justify-center py-6">
      <div ref={host} className="relative aspect-[3/4] w-full touch-pan-y cursor-grab overflow-hidden" style={{ maxWidth: 340, marginInline: "auto" }}>
        {!ready && <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">Memuat buku notes 3D…</div>}
      </div>
      {ready && (
        <Button
          variant="outline" size="icon"
          title={isPaused ? "Putar buku notes" : "Jeda putaran buku notes"}
          aria-label={isPaused ? "Putar buku notes" : "Jeda putaran buku notes"}
          onClick={() => { paused.current = !paused.current; setPaused(paused.current); }}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      )}
    </div>
  );
}
