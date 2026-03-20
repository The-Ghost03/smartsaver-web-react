import { Outlet } from "react-router-dom";
import { BackToTop, Footer, Header } from "@/components/layout";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
