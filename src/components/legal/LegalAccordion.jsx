import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * @param {{ id: string; title: string; body: React.ReactNode }[]} items
 */
export function LegalAccordion({ items, className }) {
  const defaultOpen = items[0]?.id ? [items[0].id] : [];

  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpen}
      className={cn("flex w-full flex-col gap-3", className)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="rounded-2xl border border-border bg-paper px-5 shadow-none transition-colors data-[state=open]:bg-card data-[state=open]:shadow-sm md:px-6"
        >
          <AccordionTrigger className="cursor-pointer py-5 text-left font-heading text-base font-semibold text-foreground hover:no-underline md:text-lg">
            {item.title}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-[0.9375rem] leading-relaxed text-muted-foreground">
            {item.body}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
