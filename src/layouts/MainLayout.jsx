import { Outlet } from "react-router-dom";
import { Footer, Header } from "@/components/layout";

export default function MainLayout() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
