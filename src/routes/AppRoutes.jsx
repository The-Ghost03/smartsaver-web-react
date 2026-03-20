import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { JellyRouteLoader } from "@/components/loaders/JellyRouteLoader";
import MainLayout from "@/layouts/MainLayout";

const Home = lazy(() => import("@/pages/Home"));
const CGU = lazy(() => import("@/pages/CGU"));
const Policy = lazy(() => import("@/pages/Policy"));
const MentionsLegales = lazy(() => import("@/pages/MentionsLegales"));

export function AppRoutes() {
  return (
    <Suspense fallback={<JellyRouteLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.CGU} element={<CGU />} />
          <Route path={ROUTES.PRIVACY} element={<Policy />} />
          <Route path={ROUTES.LEGAL} element={<MentionsLegales />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
