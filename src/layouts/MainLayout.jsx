import { Outlet } from "react-router-dom";
import { Languages } from "lucide-react";
import { SeoHead } from "@/components/SeoHead";
import { PointerRibbonLines } from "@/components/effects/PointerRibbonLines";
import {
  BackToTop,
  Footer,
  Header,
  LanguageSwitch,
  ScrollToTop,
} from "@/components/layout";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SeoHead />
      <ScrollToTop />
      <PointerRibbonLines />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <div className="pointer-events-none fixed inset-y-0 right-0 z-60 flex items-center pr-[max(0.5rem,env(safe-area-inset-right))]">
        <div className="pointer-events-auto flex flex-col items-center gap-1.5">
          <div className="rounded-full bg-background/95 p-1.5 ring-1 ring-foreground/15 shadow-sm backdrop-blur-sm dark:bg-background/85 dark:ring-white/20">
            <Languages className="size-3.5 text-foreground/85 sm:size-4" aria-hidden />
          </div>
          <div className="rounded-l-2xl border border-r-0 border-foreground/15 bg-background/96 px-2 py-2.5 shadow-[0_8px_24px_-8px_rgba(15,31,61,0.22)] backdrop-blur-md sm:px-2.5 sm:py-3 dark:border-white/18 dark:bg-background/88 dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
            <LanguageSwitch layout="vertical" />
          </div>
        </div>
      </div>
    </div>
  );
}
