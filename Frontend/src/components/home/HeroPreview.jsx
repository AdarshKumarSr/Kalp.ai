import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function HeroPreview({ onClose }) {
  const { dark } = useTheme();

  const cardBg   = dark ? "#141414" : "#ffffff";
  const border   = dark ? "#262626" : "#e5e7eb";
  const textMain = dark ? "#f5f5f5" : "#111111";
  const textMuted= dark ? "#a3a3a3" : "#6b7280";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm px-6"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl rounded-3xl p-10 shadow-xl flex flex-col gap-6"
        style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
      >
        <div className="flex justify-between items-start">
          <div className="text-xs" style={{ color: textMuted }}>
            Platform Overview • Beta
          </div>
          <button onClick={onClose} className="text-sm font-medium" style={{ color: textMuted }}>
            ✕
          </button>
        </div>

        <h2 className="text-4xl font-serif italic" style={{ color: textMain }}>
          How Research Works Here
        </h2>

        <p className="leading-relaxed" style={{ color: textMuted }}>
          Researchers can publish their work openly, while explorers read and
          discover research shared by the community. The platform focuses on
          accessibility and visibility.
        </p>

        <ul className="list-disc pl-6 text-sm space-y-2" style={{ color: textMuted }}>
          <li>Open publishing for researchers</li>
          <li>Community-driven discovery</li>
          <li>No AI or review layer at this stage</li>
        </ul>
      </motion.article>
    </motion.div>
  );
}