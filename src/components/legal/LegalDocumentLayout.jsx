import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PAGE_NARROW } from "@/constants/layout";
import { scaleIn, viewportOnce } from "@/lib/motion-variants";

export function LegalDocumentLayout({ title, description, children }) {
  return (
    <section className="relative border-b bg-muted/30 pb-16 pt-24 md:pb-20 md:pt-28">
      <div className="fx-grid-light pointer-events-none absolute inset-0 opacity-40" />
      <div className={`relative z-10 ${PAGE_NARROW}`}>
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Card className="border border-border/80 shadow-md backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </CardTitle>
              {description ? (
                <CardDescription>{description}</CardDescription>
              ) : null}
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-foreground [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:font-medium [&_strong]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:my-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
              {children}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
