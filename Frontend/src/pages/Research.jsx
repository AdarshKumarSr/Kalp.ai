import { useEffect, useState } from "react";
import api from "../api/axios";
import ResearchCard from "../components/research/ResearchCard";
import PublishResearchModal from "../components/research/PublishResearchModal";
import ResearchPreview from "../components/research/ResearchPreview";
import { useAuth } from "../auth/AuthContext";
import Navbar from "../components/layout/Navbar";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const INITIAL_COUNT = 3;
const LOAD_MORE_COUNT = 3;

// ── Skeleton components ──────────────────────────────────────
function SkeletonFeatured({ cardBg, border, shimmer }) {
  return (
    <div className="rounded-2xl p-8 flex flex-col gap-4"
      style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}>
      <div className="h-3 w-32 rounded-full" style={shimmer} />
      <div className="h-8 w-2/3 rounded-xl" style={shimmer} />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full rounded-full" style={shimmer} />
        <div className="h-3 w-5/6 rounded-full" style={shimmer} />
        <div className="h-3 w-4/6 rounded-full" style={shimmer} />
      </div>
      <div className="h-4 w-40 rounded-full" style={shimmer} />
    </div>
  );
}

function SkeletonCard({ cardBg, border, shimmer }) {
  return (
    <div className="rounded-2xl p-6 flex flex-col gap-3"
      style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}>
      <div className="h-3 w-24 rounded-full" style={shimmer} />
      <div className="h-6 w-3/4 rounded-lg" style={shimmer} />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full rounded-full" style={shimmer} />
        <div className="h-3 w-5/6 rounded-full" style={shimmer} />
      </div>
    </div>
  );
}

export default function Research() {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("ALL");
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const { user } = useAuth();
  const { dark } = useTheme();

  const bg        = dark ? "#0f0f0f" : "#fafafa";
  const textMain  = dark ? "#f5f5f5" : "#111111";
  const textMuted = dark ? "#a3a3a3" : "#6b7280";
  const cardBg    = dark ? "#141414" : "#ffffff";
  const border    = dark ? "#262626" : "#e5e7eb";
  const shimmerBg = dark ? "#1f1f1f" : "#f0f0f0";

  // Animated shimmer style
  const shimmer = {
    backgroundColor: shimmerBg,
    backgroundImage: `linear-gradient(90deg, ${shimmerBg} 0%, ${dark ? "#2a2a2a" : "#e0e0e0"} 50%, ${shimmerBg} 100%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  };

  const filterBtn = (active) => active
    ? { backgroundColor: "#f5c400", color: "#000" }
    : { backgroundColor: cardBg, border: `1px solid ${border}`, color: textMain };

  const fetchResearch = async () => {
    setLoading(true);
    try {
      const res = await api.get("/research");
      setResearch(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResearch(); }, []);
  useEffect(() => { setVisibleCount(INITIAL_COUNT); }, [selectedDomain]);

  const domains = ["ALL", "Arificial Intelligence", "Computer Vision", "Blockchain", "NLP", "Robotics", "Ethics", "Philosophy"];

  const filtered = selectedDomain === "ALL"
    ? research
    : research.filter((r) => r.domain === selectedDomain);

  const featured = filtered[0];
  const rest = filtered.slice(1, visibleCount + 1);
  const hasMore = filtered.length > visibleCount + 1;

  return (
    <>
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <Navbar />

      <section className="px-6 py-20" style={{ backgroundColor: bg, color: textMain }}>
        <div className="max-w-6xl mx-auto flex flex-col gap-12">

          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif italic" style={{ color: textMain }}>
                Research Discovery
              </h1>
              <p className="mt-2 max-w-md" style={{ color: textMuted }}>
                Explore published research and initiate collaboration.
              </p>
            </div>
            {user?.role === "RESEARCHER" && (
              <button
                onClick={() => setOpen(true)}
                className="h-10 px-6 rounded-full font-bold hover:opacity-90 transition"
                style={{ backgroundColor: "#f5c400", color: "#000" }}
              >
                Publish Research
              </button>
            )}
          </div>

          {/* Domain Filters */}
          <div className="flex flex-wrap gap-2">
            {domains.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDomain(d)}
                className="px-4 py-2 rounded-full text-sm font-medium transition"
                style={filterBtn(selectedDomain === d)}
              >
                {d}
              </button>
            ))}
          </div>

          {/* ── SKELETON or CONTENT ── */}
          {loading ? (
            <>
              <SkeletonFeatured cardBg={cardBg} border={border} shimmer={shimmer} />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <SkeletonCard key={i} cardBg={cardBg} border={border} shimmer={shimmer} />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <motion.div
                  className="rounded-2xl p-8 flex flex-col gap-4"
                  style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-xs font-medium" style={{ color: textMuted }}>
                    <span>{featured.domain}</span>
                    <span className="size-1 rounded-full" style={{ backgroundColor: textMuted }} />
                    <span>{new Date(featured.createdAt).getFullYear()}</span>
                  </div>
                  <h2 className="text-3xl font-serif italic" style={{ color: textMain }}>
                    {featured.title}
                  </h2>
                  <p className="leading-relaxed max-w-3xl" style={{ color: textMuted }}>
                    {featured.abstract}
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedResearch(featured)}
                      className="text-sm font-medium underline underline-offset-4"
                      style={{ color: textMain }}
                    >
                      Read Full Research →
                    </button>
                    {featured.sourceCode && (
                      <a
                        href={featured.sourceCode}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-bold underline underline-offset-4"
                        style={{ color: textMain }}
                      >
                        View Source Code →
                      </a>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
                {rest.map((item, i) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <ResearchCard
                      data={item}
                      onClick={() => setSelectedResearch(item)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <div className="flex justify-center pt-12">
                {hasMore ? (
                  <button
                    onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
                    className="text-sm font-medium transition"
                    style={{ color: textMain }}
                  >
                    Explore More Research ↓
                  </button>
                ) : (
                  filtered.length > 1 && (
                    <p className="text-sm" style={{ color: textMuted }}>
                      No more research to explore.
                    </p>
                  )
                )}
              </div>
            </>
          )}

        </div>

        {open && (
          <PublishResearchModal onClose={() => setOpen(false)} onSuccess={fetchResearch} />
        )}
      </section>

      <AnimatePresence>
        {selectedResearch && (
          <ResearchPreview
            data={selectedResearch}
            onClose={() => setSelectedResearch(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}