import { useRef, useState } from "react";
import { useTheme } from "../../hooks/useTheme";

const OTPInput = ({ length = 6, onComplete, disabled = false }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [values, setValues] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const focusInput = (index) => {
    if (inputsRef.current[index]) {
      inputsRef.current[index].focus();
    }
  };

  const handleChange = (index, e) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // digits only

    const newValues = [...values];
    newValues[index] = val.slice(-1); // take last digit
    setValues(newValues);

    if (val && index < length - 1) {
      focusInput(index + 1);
    }

    const otp = newValues.join("");
    if (otp.length === length && !newValues.includes("")) {
      onComplete?.(otp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;

    const newValues = [...values];
    for (let i = 0; i < pasted.length; i++) {
      newValues[i] = pasted[i];
    }
    setValues(newValues);

    const nextIndex = Math.min(pasted.length, length - 1);
    focusInput(nextIndex);

    if (pasted.length === length) {
      onComplete?.(pasted);
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {values.map((val, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={val}
          disabled={disabled}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          className={`w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-lg border-2 outline-none transition-all duration-200
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            ${val
              ? isDark
                ? "border-brand-primary bg-purple-900/20 text-white"
                : "border-brand-primary bg-purple-50 text-gray-900"
              : isDark
                ? "border-gray-600 bg-gray-800 text-white focus:border-brand-primary"
                : "border-gray-300 bg-white text-gray-900 focus:border-brand-primary"
            }`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
