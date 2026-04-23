import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/layouts";
import Properties from "@/features/properties";
import PropertyIncomeExpenseDetailScreen from "@/features/property-income-expense-detail";
import Login from "@/features/login";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PropertyIncomeExpenseListScreen from "@/features/property-income-expense-list";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/properties" element={<Properties />} />
            <Route
              path="/properties/finance/list"
              element={<PropertyIncomeExpenseListScreen />}
            />
            <Route
              path="/properties/finance/detail"
              element={<PropertyIncomeExpenseDetailScreen />}
            />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}