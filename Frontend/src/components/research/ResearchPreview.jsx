import { motion } from "framer-motion";

export default function ResearchPreview({ data, onClose }) {
  return (
    <motion.div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        px-6
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        layoutId={`research-${data._id}`}
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-4xl
          rounded-3xl p-10
          bg-card
          border border-app
          shadow-xl
          flex flex-col gap-6
        "
      >
        {/* ===== Meta + Close ===== */}
        <div className="flex justify-between items-start">
          <div className="text-xs text-muted">
            {data.domain} •{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </div>

          <button
            onClick={onClose}
            className="
              text-sm font-medium
              text-main
              hover:text-muted
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* ===== Title ===== */}
        <h2 className="text-4xl font-serif italic text-main">
          {data.title}
        </h2>

        {/* ===== Abstract ===== */}
        <p className="text-muted leading-relaxed">
          {data.abstract}
        </p>

        {/* ===== References ===== */}
        {data.links?.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {data.links.map((l, i) => (
              <a
                key={i}
                href={l}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  text-sm underline
                  text-main
                  hover:text-muted
                  transition
                "
              >
                Reference
              </a>
            ))}
          </div>
        )}

        {/* ===== Source Code ===== */}
        {data.sourceCode && (
          <a
            href={data.sourceCode}
            target="_blank"
            rel="noopener noreferrer"
            className="
              text-sm font-bold underline underline-offset-4
              text-main
              hover:text-primary
              transition
            "
          >
            View Source Code →
          </a>
        )}
      </motion.article>
    </motion.div>
  );
}
