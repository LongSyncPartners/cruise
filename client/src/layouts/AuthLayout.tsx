import { Outlet } from "react-router-dom";
import Header from "./AuthLayoutHeader";
import Menu from "./Menu";
import "./MainLayout.css";

export default function MainLayout() {
    return (
        <div className="">
            <Header />

            <div className="container">               
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
