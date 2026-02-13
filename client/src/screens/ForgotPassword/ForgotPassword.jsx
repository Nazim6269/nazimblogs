import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import OTPInput from "../../Components/OTPInput/OTPInput";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const RESEND_COOLDOWN = 30;
const OTP_EXPIRY = 600;

const ForgotPassword = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP + new password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sending, setSending] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [expiryCountdown, setExpiryCountdown] = useState(0);
  const countdownRef = useRef(null);
  const expiryRef = useRef(null);
  const { user, forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (expiryRef.current) clearInterval(expiryRef.current);
    };
  }, []);

  const startResendCooldown = useCallback(() => {
    setCountdown(RESEND_COOLDOWN);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const startExpiryTimer = useCallback(() => {
    setExpiryCountdown(OTP_EXPIRY);
    if (expiryRef.current) clearInterval(expiryRef.current);
    expiryRef.current = setInterval(() => {
      setExpiryCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(expiryRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    setSending(true);
    const otpToast = toast.loading("Sending reset code...");
    try {
      await forgotPassword(email);
      toast.success("Reset code sent! Check your email", { id: otpToast });
      setStep(2);
      startResendCooldown();
      startExpiryTimer();
    } catch (err) {
      toast.error(err.message || "Failed to send reset code", { id: otpToast });
    } finally {
      setSending(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    setSending(true);
    const otpToast = toast.loading("Resending code...");
    try {
      await forgotPassword(email);
      toast.success("New code sent!", { id: otpToast });
      startResendCooldown();
      startExpiryTimer();
    } catch (err) {
      toast.error(err.message || "Failed to resend code", { id: otpToast });
    } finally {
      setSending(false);
    }
  };

  const handleOTPComplete = (completedOtp) => {
    setOtp(completedOtp);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }
    if (!newPassword.trim()) {
      toast.error("Please enter a new password");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setResetting(true);
    const resetToast = toast.loading("Resetting password...");
    try {
      await resetPassword(email, otp, newPassword);
      toast.success("Password reset successfully!", { id: resetToast });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Password reset failed", { id: resetToast });
    } finally {
      setResetting(false);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex w-full min-h-screen items-start justify-center transition-colors duration-500">
      <div
        className={`w-full max-w-md px-5 py-6 sm:px-8 sm:py-8 rounded-md shadow-md space-y-6 transition-all duration-500
        ${isDark
            ? "bg-gray-900/90 border border-gray-700 text-gray-200"
            : "bg-white border border-gray-200 text-gray-900"
          }`}
      >
        {step === 1 ? (
          <>
            {/* Step 1: Enter Email */}
            <div className="text-center space-y-2">
              <h1
                className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${isDark ? "text-gray-100" : "text-gray-900"}`}
              >
                Forgot Password
              </h1>
              <p
                className={`text-sm opacity-70 transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Enter your email and we&apos;ll send you a reset code
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSendOTP}>
              <InputGroup
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                disabled={sending}
                className={`w-full py-2.5 text-sm font-semibold rounded-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${isDark
                  ? "bg-brand-primary text-white hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/50"
                  : "bg-alter-brand-primary text-white hover:bg-alter-brand-secondary hover:shadow-md hover:shadow-violet-500/50"
                  }`}
              >
                {sending ? "Sending..." : "Send Reset Code"}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs opacity-70 border-t pt-3 mt-3 border-gray-300 dark:border-gray-700">
              <p className="transition-colors duration-500">
                Remember your password?
              </p>
              <Link
                to="/login"
                className={`underline font-medium transition-colors duration-500 ${isDark
                  ? "text-brand-tertiary hover:text-purple-300"
                  : "text-indigo-600 hover:text-indigo-800"
                  }`}
              >
                Login
              </Link>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: OTP + New Password */}
            <div className="text-center space-y-2">
              <h1
                className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${isDark ? "text-gray-100" : "text-gray-900"}`}
              >
                Reset Password
              </h1>
              <p
                className={`text-sm opacity-70 transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Enter the code sent to{" "}
                <span className="font-semibold">{email}</span>
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleResetPassword}>
              <OTPInput
                length={6}
                onComplete={handleOTPComplete}
                disabled={resetting}
              />

              {/* Expiry countdown */}
              {expiryCountdown > 0 && (
                <p
                  className={`text-center text-sm ${expiryCountdown < 60
                    ? "text-red-500"
                    : isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Code expires in{" "}
                  <span className="font-semibold">{formatTime(expiryCountdown)}</span>
                </p>
              )}
              {expiryCountdown === 0 && step === 2 && (
                <p className="text-center text-sm text-red-500 font-medium">
                  Code expired. Please resend.
                </p>
              )}

              {/* Resend OTP */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Resend code in{" "}
                    <span className="font-semibold">{countdown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={sending}
                    className={`text-sm font-medium underline transition-colors duration-300 disabled:opacity-50 ${isDark
                      ? "text-brand-tertiary hover:text-purple-300"
                      : "text-indigo-600 hover:text-indigo-800"
                      }`}
                  >
                    {sending ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>

              <InputGroup
                name="newPassword"
                label="New Password"
                type="password"
                togglePassword
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <InputGroup
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                togglePassword
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="submit"
                disabled={resetting}
                className={`w-full py-2.5 text-sm font-semibold rounded-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${isDark
                  ? "bg-brand-primary text-white hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/50"
                  : "bg-alter-brand-primary text-white hover:bg-alter-brand-secondary hover:shadow-md hover:shadow-violet-500/50"
                  }`}
              >
                {resetting ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            {/* Back button */}
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`w-full py-2 text-sm font-medium rounded transition-colors duration-300 ${isDark
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Back to email
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
