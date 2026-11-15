import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, riseVariants } from "@/lib/motion-variants";

const VIEWPORT = { once: true, amount: 0.3 };

/**
 * Titre révélé mot par mot : chaque mot remonte derrière un masque.
 * `parts` : [{ text, className }] pour styler des segments (couleur, serif…).
 * `trigger` : "mount" (hero) ou "view" (au scroll).
 */
export function WordsReveal({
  as = "h2",
  parts,
  text,
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
}) {
  const Tag = motion[as];
  const segments = parts ?? [{ text }];
  const label = segments.map((p) => p.text).join(" ");
  let index = 0;
  const total = segments.reduce((n, p) => n + p.text.split(" ").filter(Boolean).length, 0);

  const play =
    trigger === "mount"
      ? { initial: "hidden", animate: "visible" }
      : { initial: "hidden", whileInView: "visible", viewport: VIEWPORT };

  return (
    <Tag
      key={label}
      className={className}
      aria-label={label}
      {...play}
      variants={{ visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {segments.map((part, pi) => (
        <span key={pi} className={part.className} aria-hidden>
          {part.text.split(" ").filter(Boolean).map((word) => {
            const i = index++;
            return (
              <span
                key={`${word}-${i}`}
                className="inline-block overflow-hidden pt-[0.22em] -mt-[0.22em] pb-[0.12em] -mb-[0.12em] align-bottom"
              >
                <motion.span
                  className="inline-block will-change-transform"
                  variants={{
                    hidden: { y: "105%", rotate: 4 },
                    visible: { y: "0%", rotate: 0, transition: { duration: 0.7, ease: EASE } },
                  }}
                >
                  {word}
                </motion.span>
                {i < total - 1 ? " " : null}
              </span>
            );
          })}
          {part.after}
        </span>
      ))}
    </Tag>
  );
}

/** Élément qui monte en se défloutant à l’entrée dans l’écran */
export function Rise({ as = "div", className, delay = 0, children, ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={riseVariants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </Comp>
  );
}

/** Conteneur qui déclenche ses enfants `riseVariants` en cascade */
export function RiseGroup({ as = "div", className, stagger = 0.1, children, ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...props}
    >
      {children}
    </Comp>
  );
}

/** Enfant d’un RiseGroup */
export function RiseItem({ as = "div", className, children, ...props }) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={riseVariants} {...props}>
      {children}
    </Comp>
  );
}

/**
 * Panneau qui « s’ouvre » en suivant le scroll : le clip-path passe d’un
 * rectangle rentré aux bords pleins pendant que la section arrive.
 */
export function ClipPanel({ className, radius = "2.5rem", children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 35%"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const clipPath = useTransform(
    inset,
    (v) => `inset(${v}% ${v * 0.6}% ${v}% ${v * 0.6}% round ${radius})`,
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduce ? { clipPath: `inset(0 round ${radius})` } : { clipPath }}
    >
      {children}
    </motion.div>
  );
}

const nf = new Intl.NumberFormat("fr-FR");

/** Nombre qui compte jusqu’à `to` quand il devient visible */
export function CountUp({ to, suffix = "", className, duration = 1.4 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${nf.format(to)}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        el.textContent = `${nf.format(Math.round(v))}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {`${nf.format(reduce ? to : 0)}${suffix}`}
    </span>
  );
}

/** Ligne horizontale qui se dessine de gauche à droite */
export function DrawLine({ className, delay = 0, trigger = "view" }) {
  const play =
    trigger === "mount"
      ? { initial: { scaleX: 0 }, animate: { scaleX: 1 } }
      : { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: VIEWPORT };
  return (
    <motion.span
      aria-hidden
      className={cn("block origin-left", className)}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...play}
    />
  );
}
