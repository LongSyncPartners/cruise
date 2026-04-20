import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import "./MainLayout.css";
import { Toolbar } from "@mui/material";
import { ToastProvider } from "@/providers/ToastProvider";

export default function MainLayout() {
  return (
    <ToastProvider>
      <div>
        <Header />
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