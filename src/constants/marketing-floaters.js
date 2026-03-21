import {
  Banknote,
  CircleDollarSign,
  Landmark,
  PiggyBank,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

/**
 * Définitions communes : même trajectoire / durée, styles distincts hero (fond sombre) vs jelly loader (fond clair).
 * `includeInJellyRouteLoader: false` exclut l’icône du loader (ex. TrendingUp absente du jelly actuel).
 */
const FLOATER_DEFS = [
  {
    Icon: Wallet,
    includeInJellyRouteLoader: true,
    hero: {
      className:
        "left-[2%] top-[14%] text-primary-foreground/[0.16] max-md:left-[3%]",
      iconClass: "size-12 max-md:size-8",
    },
    jelly: {
      className: "left-[5%] top-[14%] text-primary/18",
      iconClass: "size-11 max-md:size-9",
    },
    x: [0, 100, 55, -40, 0],
    y: [0, -35, 45, 20, 0],
    duration: 42,
  },
  {
    Icon: PiggyBank,
    includeInJellyRouteLoader: true,
    hero: {
      className:
        "right-[8%] top-[22%] text-primary-foreground/[0.14] max-md:right-[5%]",
      iconClass: "size-14 max-md:size-9",
    },
    jelly: {
      className: "right-[7%] top-[20%] text-primary/14",
      iconClass: "size-12 max-md:size-10",
    },
    x: [0, -85, -30, 50, 0],
    y: [0, 40, -20, 30, 0],
    duration: 36,
  },
  {
    Icon: Users,
    includeInJellyRouteLoader: true,
    hero: {
      className:
        "left-[38%] top-[8%] text-primary-foreground/[0.12] max-md:left-[45%]",
      iconClass: "size-10 max-md:size-7",
    },
    jelly: {
      className: "left-[42%] top-[8%] text-primary/12 max-md:left-[48%]",
      iconClass: "size-9 max-md:size-7",
    },
    x: [0, -60, 25, 40, 0],
    y: [0, 50, 25, -35, 0],
    duration: 48,
  },
  {
    Icon: TrendingUp,
    includeInJellyRouteLoader: false,
    hero: {
      className:
        "right-[28%] bottom-[38%] text-primary-foreground/[0.15] max-md:right-[20%] max-md:bottom-[32%]",
      iconClass: "size-11 max-md:size-8",
    },
    x: [0, 70, -45, 20, 0],
    y: [0, -50, -15, 40, 0],
    duration: 40,
  },
  {
    Icon: Landmark,
    includeInJellyRouteLoader: true,
    hero: {
      className:
        "left-[12%] bottom-[18%] text-primary-foreground/[0.13] max-md:left-[6%]",
      iconClass: "size-10 max-md:size-7",
    },
    jelly: {
      className: "left-[10%] bottom-[16%] text-primary/14",
      iconClass: "size-10 max-md:size-8",
    },
    x: [0, 65, -55, 30, 0],
    y: [0, 30, -40, -15, 0],
    duration: 44,
  },
  {
    Icon: CircleDollarSign,
    includeInJellyRouteLoader: true,
    hero: {
      className:
        "right-[4%] bottom-[12%] text-primary-foreground/[0.14] max-md:right-[2%]",
      iconClass: "size-12 max-md:size-8",
    },
    jelly: {
      className: "right-[5%] bottom-[14%] text-primary/15",
      iconClass: "size-11 max-md:size-9",
    },
    x: [0, -95, -40, 60, 0],
    y: [0, -25, 35, -20, 0],
    duration: 50,
  },
  {
    Icon: Banknote,
    includeInJellyRouteLoader: true,
    hero: {
      className:
        "left-[52%] top-[42%] text-primary-foreground/[0.1] max-md:hidden",
      iconClass: "size-9",
    },
    jelly: {
      className: "left-[48%] top-[38%] text-primary/10 max-md:hidden",
      iconClass: "size-9",
    },
    x: [0, 45, -70, 15, 0],
    y: [0, -40, 20, 35, 0],
    duration: 46,
  },
];

function toHeroFloater(def) {
  return {
    Icon: def.Icon,
    className: def.hero.className,
    iconClass: def.hero.iconClass,
    x: def.x,
    y: def.y,
    duration: def.duration,
  };
}

function toJellyFloater(def) {
  if (!def.includeInJellyRouteLoader || !def.jelly) return null;
  return {
    Icon: def.Icon,
    className: def.jelly.className,
    iconClass: def.jelly.iconClass,
    x: def.x,
    y: def.y,
    duration: def.duration,
  };
}

/** Icônes dérivantes — hero (section « Gérez votre argent ») */
export const heroMarketingFloaters = FLOATER_DEFS.map(toHeroFloater);

/** Icônes dérivantes — JellyRouteLoader (fond clair) */
export const jellyRouteFloaters = FLOATER_DEFS.map(toJellyFloater).filter(
  Boolean
);
