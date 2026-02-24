import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import "./MainLayout.css";
import {Toolbar} from '@mui/material';

export default function MainLayout() {
    return (
        <div className="">
            <Header />
            <Toolbar />
            <div className="container">
                <Menu />
                
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}