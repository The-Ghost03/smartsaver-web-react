import { cn } from "@/lib/utils";

const legalHtmlProse =
  "[&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:leading-relaxed [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:font-medium [&_a]:text-foreground";

/**
 * Rendu HTML statique issu des traductions (contenu maîtrisé, pas d’entrée utilisateur).
 */
export function LegalHtmlBlock({ html, className }) {
  if (!html) return null;
  return (
    <div
      className={cn(
        "text-[0.9375rem] leading-relaxed text-muted-foreground",
        legalHtmlProse,
        className
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
