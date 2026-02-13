import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputGroup from "../../Components/InputGroup/InputGroup";
import OTPInput from "../../Components/OTPInput/OTPInput";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../contexts/AuthContext";
import { googleProvider, githubProvider } from "../../firebase";
import toast from "react-hot-toast";

const RESEND_COOLDOWN = 30; // seconds
const OTP_EXPIRY = 600; // 10 minutes in seconds

const Register = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [step, setStep] = useState(1); // 1 = form, 2 = OTP
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [sendingOTP, setSendingOTP] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [expiryCountdown, setExpiryCountdown] = useState(0);
  const countdownRef = useRef(null);
  const expiryRef = useRef(null);
  const { user, socialLogin, sendRegisterOTP, verifyRegisterOTP } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Cleanup timers
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.firstName.trim() || !formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    setSendingOTP(true);
    const otpToast = toast.loading("Sending OTP to your email...");
    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      await sendRegisterOTP(name, formData.email, formData.password);
      toast.success("OTP sent! Check your email", { id: otpToast });
      setStep(2);
      startResendCooldown();
      startExpiryTimer();
    } catch (err) {
      toast.error(err.message || "Failed to send OTP", { id: otpToast });
    } finally {
      setSendingOTP(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    setSendingOTP(true);
    const otpToast = toast.loading("Resending OTP...");
    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      await sendRegisterOTP(name, formData.email, formData.password);
      toast.success("New OTP sent!", { id: otpToast });
      startResendCooldown();
      startExpiryTimer();
    } catch (err) {
      toast.error(err.message || "Failed to resend OTP", { id: otpToast });
    } finally {
      setSendingOTP(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setVerifying(true);
    const verifyToast = toast.loading("Verifying OTP...");
    try {
      await verifyRegisterOTP(formData.email, otp);
      toast.success("Account created successfully!", { id: verifyToast });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Verification failed", { id: verifyToast });
    } finally {
      setVerifying(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    const socialToast = toast.loading("Connecting...");
    try {
      await socialLogin(provider);
      toast.success("Login successful!", { id: socialToast });
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Social login failed", { id: socialToast });
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
            {/* Step 1: Registration Form */}
            <div className="text-center space-y-2">
              <h1
                className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${isDark ? "text-gray-100" : "text-gray-900"}`}
              >
                Create Account
              </h1>
              <p
                className={`text-sm opacity-70 transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                Join us! Fill in the details to get started
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSendOTP}>
              <InputGroup
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputGroup
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              <InputGroup
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
              <InputGroup
                name="password"
                label="Password"
                type="password"
                togglePassword
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="submit"
                disabled={sendingOTP}
                className={`w-full py-2.5 text-sm font-semibold rounded-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed ${isDark
                  ? "bg-brand-primary text-white hover:bg-purple-700"
                  : "bg-alter-brand-primary text-white hover:bg-alter-brand-secondary"
                  }`}
              >
                {sendingOTP ? "Sending OTP..." : "Send Verification Code"}
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs opacity-70 border-t pt-3 mt-3 border-gray-300 dark:border-gray-700">
              <p className="transition-colors duration-500">
                Already have an account?
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

            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleSocialLogin(googleProvider)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-500 ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
              >
                Register with Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin(githubProvider)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all duration-500 ${isDark
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-200"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
              >
                Register with Github
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Step 2: OTP Verification */}
            <div className="text-center space-y-2">
              <h1
                className={`text-xl sm:text-2xl font-bold transition-colors duration-500 ${isDark ? "text-gray-100" : "text-gray-900"}`}
              >
                Verify Email
              </h1>
              <p
                className={`text-sm opacity-70 transition-colors duration-500 ${isDark ? "text-gray-400" : "text-gray-600"}`}
              >
                We sent a 6-digit code to{" "}
                <span className="font-semibold">{formData.email}</span>
              </p>
            </div>

            <div className="space-y-4">
              <OTPInput
                length={6}
                onComplete={handleVerifyOTP}
                disabled={verifying}
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
                    disabled={sendingOTP}
                    className={`text-sm font-medium underline transition-colors duration-300 disabled:opacity-50 ${isDark
                      ? "text-brand-tertiary hover:text-purple-300"
                      : "text-indigo-600 hover:text-indigo-800"
                      }`}
                  >
                    {sendingOTP ? "Sending..." : "Resend Code"}
                  </button>
                )}
              </div>

              {/* Back button */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className={`w-full py-2 text-sm font-medium rounded transition-colors duration-300 ${isDark
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Back to registration form
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
