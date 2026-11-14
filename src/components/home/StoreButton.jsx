import { cn } from "@/lib/utils";

function AppleGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.37 12.77c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.47.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.77 1.1 1.68 2.34 2.87 2.3 1.15-.05 1.59-.75 2.98-.75 1.39 0 1.78.75 3 .72 1.24-.02 2.02-1.12 2.78-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.44-3.68ZM14.1 6.02c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27Z" />
    </svg>
  );
}

function AndroidGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.6 9.48 19.44 6.3a.38.38 0 0 0-.66-.38l-1.86 3.22a11.5 11.5 0 0 0-9.84 0L5.22 5.92a.38.38 0 1 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52ZM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Z" />
    </svg>
  );
}

const GLYPHS = { ios: AppleGlyph, android: AndroidGlyph };

/**
 * Bouton de store. Sans `href`, s’affiche désactivé avec la mention `soonLabel`.
 */
export function StoreButton({ platform, href, small, label, soonLabel, className }) {
  const Glyph = GLYPHS[platform];
  const content = (
    <>
      <Glyph className="size-7 shrink-0" />
      <span className="flex flex-col items-start leading-none">
        <span className="text-[0.65rem] font-medium opacity-75">
          {href ? small : soonLabel}
        </span>
        <span className="mt-1 font-heading text-base font-semibold">{label}</span>
      </span>
    </>
  );

  const base =
    "inline-flex h-14 min-w-44 items-center gap-3 rounded-2xl px-5 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, "cursor-not-allowed bg-navy text-white/90", className)}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, "bg-ink text-white hover:bg-navy", className)}
    >
      {content}
    </a>
  );
}
