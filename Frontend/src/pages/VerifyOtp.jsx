import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const { state } = useLocation();
  const navigate = useNavigate();
  const { verifyOtp, requestOtp } = useAuth();
  const { dark } = useTheme();

  const email = state?.email;
  const redirectTo = state?.from || "/home";

  const bg       = dark ? "#0f0f0f" : "#f8f8f5";
  const cardBg   = dark ? "#141414" : "#ffffff";
  const border   = dark ? "#262626" : "#e5e7eb";
  const textMain = dark ? "#f5f5f5" : "#111111";
  const textMuted= dark ? "#a3a3a3" : "#6b7280";
  const inputBg  = dark ? "#1a1a1a" : "#fafaf7";
  const btnBg    = dark ? "#f5f5f5" : "#111111";
  const btnText  = dark ? "#111111" : "#ffffff";

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!email) {
    return (
      <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: bg }}>
        <p className="text-center" style={{ color: textMuted }}>Invalid request</p>
      </section>
    );
  }

  const handleVerify = async () => {
    setError("");
    try {
      await verifyOtp({ email, otp });
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid or expired OTP");
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      await requestOtp(email);
      setCooldown(30);
    } catch {
      setError("Failed to resend OTP");
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: bg }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-10 text-center space-y-6"
        style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
      >
        <h2 className="text-3xl font-serif italic" style={{ color: textMain }}>
          Verify OTP
        </h2>

        <p className="text-sm" style={{ color: textMuted }}>
          Enter the 6-digit code sent to{" "}
          <b style={{ color: textMain }}>{email}</b>
        </p>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full h-12 px-6 rounded-full text-center tracking-widest focus:outline-none transition placeholder:opacity-40"
          style={{
            backgroundColor: inputBg,
            border: `1px solid ${border}`,
            color: textMain,
          }}
        />

        <button
          onClick={handleVerify}
          className="w-full h-12 rounded-full font-semibold transition"
          style={{ backgroundColor: btnBg, color: btnText }}
        >
          Verify & Login
        </button>

        <button
          onClick={handleResend}
          disabled={cooldown > 0}
          className="text-sm underline transition disabled:cursor-not-allowed disabled:opacity-40"
          style={{ color: textMuted }}
        >
          {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
        </button>
      </div>
    </section>
  );
}