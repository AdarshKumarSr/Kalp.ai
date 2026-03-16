import { useState } from "react";
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../context/ThemeContext";
import SpaceCanvas from "../components/space/SpaceCanvas";
import { loginPlanets } from "../components/space/loginPlanets";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState("PASSWORD");

  const { login, requestOtp, user } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/home";
  if (user) return <Navigate to={redirectTo} replace />;

  const bg       = dark ? "#0f0f0f" : "#F8F7F2";
  const cardBg   = dark ? "#141414" : "#FDFDFC";
  const border   = dark ? "#262626" : "#e5e7eb";
  const textMain = dark ? "#f5f5f5" : "#111111";
  const textMuted= dark ? "#a3a3a3" : "#6b7280";
  const inputBg  = dark ? "#1a1a1a" : "#fafaf7";
  const btnBg    = dark ? "#f5f5f5" : "#111111";
  const btnText  = dark ? "#111111" : "#ffffff";

  const fieldStyle = {
    backgroundColor: inputBg,
    border: `1px solid ${border}`,
    color: textMain,
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid credentials");
    }
  };

  const handleOtpRequest = async () => {
    if (!email) return setError("Enter email first");
    try {
      await requestOtp(email);
      navigate("/verify-otp", { state: { email, from: redirectTo } });
    } catch {
      setError("Failed to send OTP");
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SpaceCanvas planets={loginPlanets} clearColor={bg} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md rounded-3xl p-10 text-center space-y-8 shadow-xl"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <h2 className="text-4xl font-serif italic" style={{ color: textMain }}>
            Welcome Back
          </h2>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {mode === "PASSWORD" ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Institutional Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-6 rounded-full focus:outline-none transition placeholder:opacity-40"
                style={fieldStyle}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-6 rounded-full focus:outline-none transition placeholder:opacity-40"
                style={fieldStyle}
                required
              />
              <button
                className="w-full h-12 rounded-full font-semibold transition"
                style={{ backgroundColor: btnBg, color: btnText }}
              >
                Login
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Institutional Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-6 rounded-full focus:outline-none transition placeholder:opacity-40"
                style={fieldStyle}
                required
              />
              <button
                onClick={handleOtpRequest}
                className="w-full h-12 rounded-full font-semibold transition"
                style={{ backgroundColor: btnBg, color: btnText }}
              >
                Send OTP
              </button>
            </div>
          )}

          <button
            onClick={() => setMode(mode === "PASSWORD" ? "OTP" : "PASSWORD")}
            className="text-sm underline"
            style={{ color: textMuted }}
          >
            {mode === "PASSWORD" ? "Login with OTP instead" : "Login with password instead"}
          </button>

          <p className="text-sm" style={{ color: textMuted }}>
            Don't have an account?{" "}
            <Link to="/signup" className="underline" style={{ color: textMain }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}