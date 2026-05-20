import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import AddTaskPage from "../pages/AddTaskPage";

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Layout />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
