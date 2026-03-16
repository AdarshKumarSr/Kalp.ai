import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import api from "../../api/axios";

export default function ChangePasswordModal({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const { dark } = useTheme();

  const cardBg   = dark ? "#141414" : "#ffffff";
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
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/change-password", { currentPassword, newPassword });
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-6"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl p-8 shadow-xl flex flex-col gap-6"
        style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif italic" style={{ color: textMain }}>
            Change Password
          </h2>
          <button onClick={onClose} className="text-sm" style={{ color: textMuted }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
            className="h-11 px-4 rounded-xl focus:outline-none transition placeholder:opacity-40"
            style={fieldStyle}
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="h-11 px-4 rounded-xl focus:outline-none transition placeholder:opacity-40"
            style={fieldStyle}
          />

          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">Password updated successfully</p>}

          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-full font-medium transition disabled:opacity-60"
            style={{ backgroundColor: btnBg, color: btnText }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}