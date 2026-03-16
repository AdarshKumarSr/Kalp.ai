import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function ConfirmDeleteModal({
  title = "Delete Research",
  description = "Are you sure you want to delete this research? This action cannot be undone.",
  onConfirm,
  onClose,
  loading = false,
}) {
  const { dark } = useTheme();

  const cardBg   = dark ? "#141414" : "#ffffff";
  const border   = dark ? "#262626" : "#e5e7eb";
  const textMain = dark ? "#f5f5f5" : "#111111";
  const textMuted= dark ? "#a3a3a3" : "#6b7280";
  const cancelBg = dark ? "#1a1a1a" : "#f9fafb";

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
        <h2 className="text-2xl font-serif italic" style={{ color: textMain }}>
          {title}
        </h2>

        <p className="text-sm leading-relaxed" style={{ color: textMuted }}>
          {description}
        </p>

        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={onClose}
            className="h-10 px-5 rounded-full transition"
            style={{ backgroundColor: cancelBg, border: `1px solid ${border}`, color: textMain }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="h-10 px-5 rounded-full text-white transition disabled:opacity-60"
            style={{ backgroundColor: "#dc2626" }}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}