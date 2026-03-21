import { Outlet } from "react-router-dom";
import { PointerRibbonLines } from "@/components/effects/PointerRibbonLines";
import { BackToTop, Footer, Header } from "@/components/layout";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PointerRibbonLines />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
