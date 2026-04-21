import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Forecast from "@/pages/Forecast";
import { AuthLayout, MainLayout } from "@/layouts";
import { AuthProvider } from "../pages/Login/AuthContext";
import Properties from "@/features/properties";
import PropertyIncomeExpenseDetail from "@/features/property-income-expense-detail";
import Login from "@/features/login";


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
                    <Route path="/properties" element={<Properties />} />
                    <Route
                        path="/properties/finance"
                        element={<PropertyIncomeExpenseDetail />}
                    />
                </Route>

                 {/* fallback */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    );
}
