import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";
import BannedOverlay from "../BannedOverlay/BannedOverlay";

const BannedGuard = ({ children }) => {
    const { user } = useAuth();

    if (user && user.isBanned) {
        return <BannedOverlay />;
    }

    return children;
};

BannedGuard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BannedGuard;
