import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { AppRoutes } from "@/routes";

export default function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="top-center" closeButton />
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  );
}
