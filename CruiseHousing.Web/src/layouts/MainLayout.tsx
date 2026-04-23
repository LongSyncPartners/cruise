import { Outlet } from "react-router-dom";
import MainlayoutHeader from "./MainLayoutHeader";
import Menu from "./Menu";
import "./MainLayout.css";
import { Toolbar } from "@mui/material";
import { ToastProvider } from "@/providers/ToastProvider";

export default function MainLayout() {
  return (
    <ToastProvider>
      <div>
        <MainlayoutHeader />
        <Toolbar />

        <div className="container">
          <Menu />

          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}