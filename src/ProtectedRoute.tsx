import { Navigate } from "react-router-dom";
import useAuthStore from "./stores/authStore";

export const ProtectedRoute = ({
    children,
    allowedRole,
}: {
    children: React.ReactNode;
    allowedRole: string[];
}) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    if (allowedRole.length > 0 && !allowedRole.includes(user?.role ?? "")) {
        return (
            <Navigate
                to={user?.role === "admin" || user?.role === "sysadmin" ? "/admin/dashboard" : "/dashboard"}
                replace
            />
        );
    }

    return <>{children}</>;
};
