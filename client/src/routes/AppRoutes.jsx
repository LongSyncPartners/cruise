import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Forecast from "@/pages/Forecast";
import ApartmentReport from "@/pages/Report/Apartment";
import HomeReport from "@/pages/Report/Home";
import HomeWork from "@/pages/Report/HomeWork";
import { AuthLayout, MainLayout } from "@/layouts";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "../pages/Login/AuthContext";


export default function AppRoutes() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* Auth */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={
                            <Login />
                            } />
                </Route>

                {/* Main */}
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/forecast" element={<Forecast />} />
                    <Route path="/report/apartment" element={<ApartmentReport />} />
                    <Route path="/report/home" element={<HomeReport />} />
                    <Route path="/report/homework" element={<HomeWork />} />
                </Route>

                 {/* fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
