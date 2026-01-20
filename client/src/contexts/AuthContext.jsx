import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user is logged in (e.g., check localStorage)
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/users/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await fetch("http://localhost:3000/api/users/logout", {
                method: "POST",
            });
            localStorage.removeItem("userInfo");
            setUser(null);
            return true; // Return success status
        } catch (error) {
            console.error(error);
            return false; // Return failure status
        }
    };

    const socialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Sync with backend
            const response = await fetch("http://localhost:3000/api/users/social", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.displayName || user.email.split('@')[0],
                    email: user.email,
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Social login failed");
            }

            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    };

    const value = {
        user,
        login,
        register,
        logout,
        socialLogin,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
