import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "@/routes";
import "./style.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
