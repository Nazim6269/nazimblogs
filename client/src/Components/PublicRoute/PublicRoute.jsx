import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

const PublicRoute = ({ children }) => {
    const { user } = useAuth();

    // If user is already authenticated, redirect to home or profile
    if (user) {
        return <Navigate to="/" replace />;
    }

    // If not authenticated, render the public component (login/register)
    return children;
};

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PublicRoute;
