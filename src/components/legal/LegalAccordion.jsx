import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const contentProse =
  "[&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-3 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_li]:leading-relaxed";

/**
 * @param {{ id: string; title: string; body: React.ReactNode }[]} items
 */
export function LegalAccordion({ items, className }) {
  const defaultOpen = items[0]?.id ? [items[0].id] : [];

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpen}
      className={cn("w-full border-y border-border/50", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="border-0 border-b border-border/50 bg-transparent px-0 shadow-none ring-0 last:border-b-0"
        >
          <AccordionTrigger className="cursor-pointer py-4 text-left font-heading text-base font-semibold tracking-tight text-foreground underline-offset-4 hover:underline md:text-[1.0625rem]">
            {item.title}
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "pb-6 pl-0 pr-2 text-[0.9375rem] leading-relaxed text-muted-foreground md:pr-0",
              contentProse
            )}
          >
            {item.body}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
