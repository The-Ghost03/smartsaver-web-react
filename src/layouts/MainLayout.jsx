import { Outlet } from "react-router-dom";
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
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-60 flex items-center pr-[max(0.5rem,env(safe-area-inset-right))]"
      >
        <div
          className="pointer-events-auto flex flex-col items-stretch gap-0 rounded-l-2xl border border-r-0 border-border/50 bg-background/90 px-1.5 py-3 shadow-lg shadow-primary/5 backdrop-blur-md sm:px-2.5 sm:py-3.5"
        >
          <LanguageSwitch layout="vertical" />
        </div>
      </div>
    </div>
  );
}
