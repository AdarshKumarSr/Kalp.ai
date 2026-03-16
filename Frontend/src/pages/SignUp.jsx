import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../context/ThemeContext";
import SpaceCanvas from "../components/space/SpaceCanvas";
import { signupPlanets } from "../components/space/signupPlanet";

const AVATARS = [
  { name: "TARS", image: "https://ih1.redbubble.net/image.782884253.3467/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u10.jpg" },
  { name: "C3PO", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIBn3__BFva1DI7u_ra821Zx_P_gagpn4P8w&s" },
  { name: "GROOT", image: "https://earthlycreations.in/wp-content/uploads/2023/09/Groot-Flower-Pot-1.jpg" },
  { name: "ULTRON", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDcWVgT8ERrEWdGlKvgjgRpOVKPpgYSN-q4A&s" },
  { name: "WALL-E", image: "https://p.turbosquid.com/ts-thumb/vT/20PdV9/Jp/walle_r_01/png/1658160209/1920x1080/fit_q87/7a17cfb94b2fe577ef000ccf0d27642255b45a63/walle_r_01.jpg" },
];

export default function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "EXPLORER", avatar: AVATARS[0],
  });
  const [error, setError] = useState("");

  const { signup, requestOtp } = useAuth();
  const { dark } = useTheme();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(form);
      await requestOtp(form.email);
      navigate("/verify-otp", { state: { email: form.email } });
    } catch {
      setError("Failed to create account. Try again.");
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden px-6"
      style={{ backgroundColor: bg }}
    >
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <SpaceCanvas planets={signupPlanets} clearColor={bg} />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center pointer-events-none">
        <div
          className="pointer-events-auto w-full max-w-md rounded-3xl p-10 text-center space-y-8 shadow-xl"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          <img src="/kalp.png" alt="Kalp Lab" className="w-14 mx-auto hover:scale-110 transition-transform duration-300 cursor-pointer" />

          <h2 className="text-4xl font-serif italic" style={{ color: textMain }}>
            Join Kalp Lab
          </h2>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Avatar Picker */}
          <div className="space-y-3">
            <p className="text-sm" style={{ color: textMuted }}>Choose your AI Avatar</p>
            <div className="grid grid-cols-5 gap-4 justify-items-center">
              {AVATARS.map((avatar) => {
                const selected = form.avatar.name === avatar.name;
                return (
                  <button
                    key={avatar.name}
                    type="button"
                    onClick={() => setForm({ ...form, avatar })}
                    className={`flex flex-col items-center gap-1 transition ${selected ? "scale-110" : "opacity-70 hover:opacity-100"}`}
                  >
                    <div
                      className="w-14 h-14 rounded-full overflow-hidden"
                      style={{ border: `2px solid ${selected ? textMain : border}` }}
                    >
                      <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-[11px] font-mono tracking-widest" style={{ color: textMuted }}>
                      {avatar.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full h-12 px-6 rounded-full focus:outline-none transition placeholder:opacity-40" style={fieldStyle} />
            <input type="email" placeholder="Institutional Email" required onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full h-12 px-6 rounded-full focus:outline-none transition placeholder:opacity-40" style={fieldStyle} />
            <input type="password" placeholder="Password" required onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full h-12 px-6 rounded-full focus:outline-none transition placeholder:opacity-40" style={fieldStyle} />
            <select
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full h-12 px-6 rounded-full focus:outline-none transition"
              style={fieldStyle}
            >
              <option value="EXPLORER">Explorer</option>
              <option value="RESEARCHER">Researcher</option>
            </select>
            <button
              className="w-full h-12 rounded-full font-semibold transition"
              style={{ backgroundColor: btnBg, color: btnText }}
            >
              Create Account
            </button>
          </form>

          <p className="text-sm" style={{ color: textMuted }}>
            Already have an account?{" "}
            <Link to="/login" className="underline" style={{ color: textMain }}>Login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}