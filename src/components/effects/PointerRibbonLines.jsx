import { useEffect, useRef, useState } from "react";

/** Couleurs marque + halo — dégradé du cercle lumineux */
const INNER = "rgba(247, 183, 49, 0.22)";
const MID = "rgba(96, 165, 250, 0.12)";
const OUTER = "rgba(26, 42, 92, 0.06)";

const RADIUS = 320;
const LERP = 0.08;

/**
 * Cercle lumineux qui suit le pointeur (pointer-events: none).
 * Désactivé si prefers-reduced-motion ou pointer grossier (tactile).
 */
function getPointerEffectEnabled() {
  if (typeof window === "undefined") return false;
  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !window.matchMedia("(pointer: coarse)").matches
  );
}

export function PointerRibbonLines() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const posRef = useRef({ x: 0, y: 0 });
  const seededRef = useRef(false);
  const rafRef = useRef(0);
  const [enabled, setEnabled] = useState(getPointerEffectEnabled);

  useEffect(() => {
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqC = window.matchMedia("(pointer: coarse)");
    const sync = () => setEnabled(!mqR.matches && !mqC.matches);
    sync();
    mqR.addEventListener("change", sync);
    mqC.addEventListener("change", sync);
    return () => {
      mqR.removeEventListener("change", sync);
      mqC.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      seededRef.current = false;
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (!seededRef.current) {
        seededRef.current = true;
        posRef.current.x = e.clientX;
        posRef.current.y = e.clientY;
      }
    };

    const tick = () => {
      const { x: mx, y: my } = mouseRef.current;
      const pos = posRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      if (!seededRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      pos.x += (mx - pos.x) * LERP;
      pos.y += (my - pos.y) * LERP;

      const gradient = ctx.createRadialGradient(
        pos.x,
        pos.y,
        0,
        pos.x,
        pos.y,
        RADIUS,
      );
      gradient.addColorStop(0, INNER);
      gradient.addColorStop(0.4, MID);
      gradient.addColorStop(0.7, OUTER);
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 mix-blend-multiply dark:mix-blend-screen"
      aria-hidden
    />
  );
}
