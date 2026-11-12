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

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export function LanyardSpinner() {
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
      const navy = css.getPropertyValue("--lanyard-band").trim();
      const deep = css.getPropertyValue("--lanyard-deep").trim();
      const ink = css.getPropertyValue("--lanyard-letter").trim();
      const blue = css.getPropertyValue("--lanyard-blue").trim();
      const violet = css.getPropertyValue("--lanyard-violet").trim();
      const metal = css.getPropertyValue("--lanyard-metal").trim();
      const paper = css.getPropertyValue("--lanyard-paper").trim();

      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0, 0);
      el.appendChild(renderer.domElement);
      renderer.domElement.setAttribute("aria-label", "Lanyard 3D Nempo dan Kala Muda dengan ID card");

      const scene = new T.Scene();
      const pmrem = new T.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;
      scene.environmentIntensity = 0.55;
      const camera = new T.PerspectiveCamera(30, 3 / 4, 0.1, 100);
      camera.position.set(0, 0.6, 15.2);
      camera.lookAt(0, 0.1, 0);
      const key = new T.DirectionalLight(ink, 2.2);
      key.position.set(3, 4, 6); scene.add(key);
      const fill = new T.DirectionalLight(violet, 0.8);
      fill.position.set(-4, 1, -3); scene.add(fill);

      const textures: InstanceType<typeof T.Texture>[] = [];
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      const toTexture = (canvas: HTMLCanvasElement) => {
        const t = new T.CanvasTexture(canvas);
        t.colorSpace = T.SRGBColorSpace; t.anisotropy = maxAniso;
        textures.push(t); return t;
      };

      // ---- Strap texture: one repeating tile, aspect matches the physical strap.
      const STRAP_W = 0.36;
      const tile = document.createElement("canvas");
      const TW = 1260;
      tile.width = TW; tile.height = 128;
      const tc = tile.getContext("2d");
      if (!tc) { renderer.dispose(); renderer.domElement.remove(); return; }
      tc.fillStyle = navy; tc.fillRect(0, 0, TW, 128);
      const edge = tc.createLinearGradient(0, 0, TW, 0);
      edge.addColorStop(0, blue); edge.addColorStop(0.5, violet); edge.addColorStop(1, blue);
      tc.fillStyle = edge; tc.fillRect(0, 3, TW, 7); tc.fillRect(0, 118, TW, 7);
      // NEMPO is the hero of the strap: the real wordmark fills almost the full strap height.
      if (nempo) {
        const sx = nempo.width * 0.151, sy = nempo.height * 0.697, sw = nempo.width * 0.703, sh = nempo.height * 0.243;
        const dh = 100, dw = dh * (sw / sh);
        tc.drawImage(nempo, sx, sy, sw, sh, 50, 15, dw, dh);
      } else {
        tc.fillStyle = ink; tc.font = "bold 96px Arial"; tc.textBaseline = "middle"; tc.fillText("nempo", 50, 62);
      }
      tc.fillStyle = ink; tc.textBaseline = "middle"; tc.textAlign = "center";
      tc.font = "bold 36px Arial"; tc.globalAlpha = 0.85;
      tc.fillText("KALA MUDA", 880, 66); tc.globalAlpha = 1;
      tc.fillStyle = edge;
      for (const x of [610, 1150]) { tc.beginPath(); tc.arc(x, 64, 9, 0, Math.PI * 2); tc.fill(); }
      const tileLen = STRAP_W * (TW / 128);
      const strapTex = toTexture(tile);
      strapTex.wrapS = T.RepeatWrapping;
      const strapTexBack = strapTex.clone();
      strapTexBack.repeat.x = -1; strapTexBack.needsUpdate = true; textures.push(strapTexBack);

      // ---- Strap loop: from the clip, up around the back of the neck, and back down.
      const loopZ = -0.35;
      const curve = new T.CatmullRomCurve3([
        [-0.05, 0, 0.42], [-0.42, 1.0, 0.36], [-0.88, 2.2, 0.16], [-1.12, 3.1, -0.22],
        [-0.86, 3.58, -0.72], [0, 3.78, -1.0], [0.86, 3.58, -0.72], [1.12, 3.1, -0.22],
        [0.88, 2.2, 0.16], [0.42, 1.0, 0.36], [0.05, 0, 0.42],
      ].map(([x, y, z]) => new T.Vector3(x, y, z)), false, "centripetal");
      const N = 320;
      const length = curve.getLength();
      const pos: number[] = [], uv: number[] = [], idx: number[] = [];
      const p = new T.Vector3(), t = new T.Vector3(), n = new T.Vector3(), w = new T.Vector3();
      for (let i = 0; i <= N; i++) {
        const s = i / N;
        curve.getPointAt(s, p); curve.getTangentAt(s, t);
        n.set(p.x, 0, p.z - loopZ).normalize();
        n.addScaledVector(t, -n.dot(t)).normalize();
        w.crossVectors(t, n).normalize();
        // Strap ends narrow slightly where they are folded into the metal crimp.
        const end = Math.min(s, 1 - s);
        const half = (STRAP_W / 2) * (end < 0.05 ? 0.7 + 0.3 * (end / 0.05) : 1);
        pos.push(p.x - w.x * half, p.y - w.y * half, p.z - w.z * half, p.x + w.x * half, p.y + w.y * half, p.z + w.z * half);
        const u = (s * length) / tileLen;
        uv.push(u, 0, u, 1);
        if (i < N) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
      }
      const strapGeo = new T.BufferGeometry();
      strapGeo.setAttribute("position", new T.Float32BufferAttribute(pos, 3));
      strapGeo.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
      strapGeo.setIndex(idx); strapGeo.computeVertexNormals();
      const strapFront = new T.MeshStandardMaterial({ map: strapTexBack, roughness: 0.78, side: T.FrontSide });
      const strapBack = new T.MeshStandardMaterial({ map: strapTex, roughness: 0.78, side: T.BackSide });

      const lanyard = new T.Group();
      lanyard.add(new T.Mesh(strapGeo, strapFront), new T.Mesh(strapGeo, strapBack));

      // ---- Hardware: crimp, swivel ring, trigger hook, card ring.
      const chrome = new T.MeshStandardMaterial({ color: metal, metalness: 1, roughness: 0.22 });
      const crimp = new T.Mesh(new T.BoxGeometry(0.4, 0.22, 0.1, 1, 1, 1), chrome);
      crimp.position.set(0, -0.02, 0.42);
      const ringTop = new T.Mesh(new T.TorusGeometry(0.08, 0.022, 12, 32), chrome);
      ringTop.position.set(0, -0.2, 0.42);
      const hook = new T.Mesh(new T.CapsuleGeometry(0.06, 0.26, 6, 16), chrome);
      hook.position.set(0, -0.48, 0.42);
      const ringCard = new T.Mesh(new T.TorusGeometry(0.1, 0.022, 12, 32), chrome);
      ringCard.rotation.y = Math.PI / 2;
      ringCard.position.set(0, -0.74, 0.42);
      lanyard.add(crimp, ringTop, hook, ringCard);

      // ---- ID card (portrait CR80 proportions) inside a clear holder.
      const CW = 1.6, CH = 2.54, CARD_TOP = -0.9;
      const S = 400; // px per unit
      const front = document.createElement("canvas"); front.width = CW * S; front.height = CH * S;
      const back = document.createElement("canvas"); back.width = CW * S; back.height = CH * S;
      const fc = front.getContext("2d"), bc = back.getContext("2d");
      if (fc && bc) {
        const W = front.width, H = front.height;
        const grad = (c: CanvasRenderingContext2D) => {
          const g = c.createLinearGradient(0, 0, W, H * 0.6);
          g.addColorStop(0, blue); g.addColorStop(1, violet); return g;
        };
        const emblem = (c: CanvasRenderingContext2D, x: number, y: number, dw: number, alpha: number) => {
          if (!nempo) return;
          const sx = nempo.width * 0.326, sy = nempo.height * 0.081, sw = nempo.width * 0.337, sh = nempo.height * 0.554;
          c.globalAlpha = alpha; c.drawImage(nempo, sx, sy, sw, sh, x, y, dw, dw * (sh / sw)); c.globalAlpha = 1;
        };
        const tinted = (img: HTMLImageElement, color: string) => {
          const o = document.createElement("canvas"); o.width = img.width; o.height = img.height;
          const oc = o.getContext("2d"); if (!oc) return img;
          oc.drawImage(img, 0, 0); oc.globalCompositeOperation = "source-in";
          oc.fillStyle = color; oc.fillRect(0, 0, o.width, o.height); return o;
        };
        const punchSlot = (c: CanvasRenderingContext2D) => {
          c.globalCompositeOperation = "destination-out";
          roundRect(c, W / 2 - 80, 36, 160, 28, 14); c.fill();
          c.globalCompositeOperation = "source-over";
        };

        // Front: gradient header with the full Nempo logo, clean paper body with the role.
        roundRect(fc, 0, 0, W, H, 36); fc.save(); fc.clip();
        fc.fillStyle = paper; fc.fillRect(0, 0, W, H);
        fc.fillStyle = grad(fc);
        fc.beginPath(); fc.moveTo(0, 0); fc.lineTo(W, 0); fc.lineTo(W, H * 0.5); fc.lineTo(0, H * 0.57); fc.closePath(); fc.fill();
        emblem(fc, W * 0.42, H * 0.06, W * 0.78, 0.12);
        if (nempo) {
          const lw = W * 0.64, lh = lw * (nempo.height / nempo.width);
          fc.drawImage(nempo, (W - lw) / 2, 112, lw, lh);
        }
        fc.textAlign = "center"; fc.textBaseline = "middle";
        fc.fillStyle = navy; fc.font = "bold 128px Arial";
        fc.letterSpacing = "10px"; fc.fillText("CREW", W / 2 + 5, H * 0.68); fc.letterSpacing = "0px";
        fc.fillStyle = violet; fc.font = "bold 30px Arial";
        fc.letterSpacing = "6px"; fc.fillText("NEMPO × KALA MUDA", W / 2 + 3, H * 0.68 + 92); fc.letterSpacing = "0px";
        fc.fillStyle = grad(fc); fc.fillRect(W / 2 - 60, H * 0.68 + 132, 120, 6);
        if (kala) {
          const lw = W * 0.46, lh = lw * (kala.height / kala.width);
          fc.drawImage(tinted(kala, navy), (W - lw) / 2, H - 70 - lh, lw, lh);
        }
        fc.restore(); punchSlot(fc);

        // Back: navy with a large centred "n" emblem and the Kala Muda logo.
        roundRect(bc, 0, 0, W, H, 36); bc.save(); bc.clip();
        bc.fillStyle = navy; bc.fillRect(0, 0, W, H);
        const halo = bc.createRadialGradient(W / 2, H * 0.42, 20, W / 2, H * 0.42, W * 0.75);
        halo.addColorStop(0, violet); halo.addColorStop(1, "transparent");
        bc.globalAlpha = 0.35; bc.fillStyle = halo; bc.fillRect(0, 0, W, H); bc.globalAlpha = 1;
        emblem(bc, W * 0.22, H * 0.16, W * 0.56, 1);
        if (kala) {
          const lw = W * 0.5, lh = lw * (kala.height / kala.width);
          bc.drawImage(kala, (W - lw) / 2, H * 0.72, lw, lh);
        }
        bc.fillStyle = grad(bc); bc.fillRect(0, H - 34, W, 34);
        bc.restore(); punchSlot(bc);
      }
      const edgeMat = new T.MeshStandardMaterial({ color: deep, roughness: 0.5 });
      const faceFront = new T.MeshStandardMaterial({ map: toTexture(front), roughness: 0.35, transparent: true, alphaTest: 0.5 });
      const faceBack = new T.MeshStandardMaterial({ map: toTexture(back), roughness: 0.35, transparent: true, alphaTest: 0.5 });
      const card = new T.Mesh(new T.BoxGeometry(CW, CH, 0.025), [edgeMat, edgeMat, edgeMat, edgeMat, faceFront, faceBack]);
      card.position.set(0, CARD_TOP - CH / 2 + 0.02, 0.42);
      // Clear sleeve slightly larger than the card.
      const sleeveMat = new T.MeshPhysicalMaterial({
        color: ink, transparent: true, opacity: 0.12, roughness: 0.04, metalness: 0, clearcoat: 1, depthWrite: false,
      });
      const sleeve = new T.Mesh(new T.BoxGeometry(CW + 0.12, CH + 0.16, 0.07), sleeveMat);
      sleeve.position.set(0, CARD_TOP - (CH + 0.16) / 2 + 0.1, 0.42);
      sleeve.renderOrder = 2;
      lanyard.add(card, sleeve);

      // Center the whole piece on the turntable axis (card face sits on the axis).
      lanyard.position.z = -0.42;
      const turntable = new T.Group();
      turntable.add(lanyard); scene.add(turntable);

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
        scene.traverse((o) => {
          if (o instanceof T.Mesh) {
            o.geometry.dispose();
            (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
          }
        });
        textures.forEach((x) => x.dispose()); envTex.dispose(); pmrem.dispose();
        renderer.dispose(); renderer.domElement.remove();
      };
    }).catch(() => {});
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className="lanyard-display bg-card relative flex flex-col justify-center py-6">
      <div ref={host} className="relative aspect-[3/4] w-full touch-pan-y cursor-grab overflow-hidden" style={{ maxWidth: 340, marginInline: "auto" }}>
        {!ready && <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">Memuat lanyard 3D…</div>}
      </div>
      {ready && (
        <Button
          variant="outline" size="icon"
          title={isPaused ? "Putar lanyard" : "Jeda putaran lanyard"}
          aria-label={isPaused ? "Putar lanyard" : "Jeda putaran lanyard"}
          onClick={() => { paused.current = !paused.current; setPaused(paused.current); }}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      )}
    </div>
  );
}
