import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";
import { useTheme } from "../../hooks/useTheme";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        // Show a message when user tries to access protected route without auth
        if (!user) {
            console.log("Please login to access this page");
        }
    }, [user]);

    // If no user is authenticated, redirect to login
    // Save the attempted location so we can redirect back after login
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If user is authenticated, render the protected component
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
