import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { dark, setDark } = useTheme();
  const navigate = useNavigate();

  // ✅ Plain JS values — nothing Tailwind can touch
  const navBg     = dark ? "rgba(15,15,15,0.85)"  : "rgba(250,250,250,0.85)";
  const border    = dark ? "#262626"               : "#e5e7eb";
  const textColor = dark ? "#f5f5f5"               : "#111111";
  const mutedBg   = dark ? "#1a1a1a"               : "#f4f4f4";
  const primary   = "#f5c400";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full flex justify-center pt-6 px-6 z-50">
      <nav
        className="flex items-center justify-between w-full max-w-5xl backdrop-blur-md rounded-full px-6 py-3 shadow-sm transition-colors"
        style={{
          backgroundColor: navBg,
          border: `1px solid ${border}`,
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/kalp.png" alt="Kalp Labs logo" className="w-7 h-7" />
          <h2
            className="text-lg font-bold font-serif italic"
            style={{ color: textColor }}
          >
            Kalp Labs
          </h2>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Research", "About"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="text-sm font-medium"
              style={{ color: textColor }}
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-4">

          {/* Theme toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition"
            style={{ border: `1px solid ${border}`, color: textColor }}
            aria-label="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>

          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden sm:block text-sm font-medium"
                style={{ color: textColor }}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="h-9 px-5 rounded-full font-bold flex items-center justify-center"
                style={{ backgroundColor: primary, color: "#000" }}
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/about">
                {user.avatar?.image ? (
                  <img
                    src={user.avatar.image}
                    alt={user.avatar.name}
                    className="w-8 h-8 rounded-full object-cover"
                    style={{ border: `1px solid ${border}` }}
                  />
                ) : (
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: mutedBg, color: textColor }}
                  >
                    {user.name?.[0] || "U"}
                  </div>
                )}
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-medium"
                style={{ color: textColor }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}