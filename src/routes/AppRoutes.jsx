import { Route, Routes } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import MainLayout from "@/layouts/MainLayout";
import CGU from "@/pages/CGU";
import Home from "@/pages/Home";
import MentionsLegales from "@/pages/MentionsLegales";
import Policy from "@/pages/Policy";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CGU} element={<CGU />} />
        <Route path={ROUTES.PRIVACY} element={<Policy />} />
        <Route path={ROUTES.LEGAL} element={<MentionsLegales />} />
      </Route>
    </Routes>
  );
}
