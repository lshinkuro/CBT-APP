import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    useEffect(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    return null;
};

export default Logout;
