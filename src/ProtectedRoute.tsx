import { Navigate } from "react-router-dom";
import useAuthStore from "./stores/authStore";

export const ProtectedRoute = ({
    children,
    allowedRole,
}: {
    children: React.ReactNode;
    allowedRole?: "admin" | "student";
}) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && user?.role !== allowedRole) {
        return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"} replace />;
    }

    return <>{children}</>;
};
