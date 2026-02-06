import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/users/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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
            const response = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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
            await fetch(`${API_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include",
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
            const response = await fetch(`${API_URL}/api/users/social`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
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

    const sendRegisterOTP = async (name, email, password) => {
        try {
            const response = await fetch(`${API_URL}/api/users/send-register-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to send OTP");
            }
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const verifyRegisterOTP = async (email, otp) => {
        try {
            const response = await fetch(`${API_URL}/api/users/verify-register-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "OTP verification failed");
            }
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const forgotPassword = async (email) => {
        try {
            const response = await fetch(`${API_URL}/api/users/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Failed to send OTP");
            }
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const resetPassword = async (email, otp, newPassword) => {
        try {
            const response = await fetch(`${API_URL}/api/users/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Password reset failed");
            }
            localStorage.setItem("userInfo", JSON.stringify(data));
            setUser(data);
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        socialLogin,
        updateUser,
        sendRegisterOTP,
        verifyRegisterOTP,
        forgotPassword,
        resetPassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
