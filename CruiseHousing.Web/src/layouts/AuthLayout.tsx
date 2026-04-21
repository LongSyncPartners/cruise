import { Outlet } from "react-router-dom";
import Header from "./AuthLayoutHeader";
import Menu from "./Menu";
import "./MainLayout.css";
import { ToastProvider } from "@/providers/ToastProvider";

export default function MainLayout() {
    return (
        <ToastProvider>
            <div>
                <Header />

                <div className="container">               
                    <main className="main-content">
                        <Outlet />
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}