import { Outlet } from "react-router-dom";
import { SeoHead } from "@/components/SeoHead";
import { BackToTop, Footer, Header, ScrollToTop } from "@/components/layout";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SeoHead />
      <ScrollToTop />
      <Header />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
