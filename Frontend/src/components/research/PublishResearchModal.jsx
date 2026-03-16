import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import api from "../../api/axios";

const DOMAIN_SUGGESTIONS = [
  "Artificial Intelligence", "Machine Learning", "Computer Vision",
  "Natural Language Processing", "Robotics", "Bioinformatics", "Biotech",
  "Cybersecurity", "Blockchain", "Data Science", "Ethics", "Healthcare",
  "Climate Tech", "Quantum Computing", "Human-Computer Interaction", "Philosophy",
];

export default function PublishResearchModal({ onClose, onSuccess, initialData = null }) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    abstract: initialData?.abstract || "",
    domains: initialData?.domains || [],
    links: initialData?.links?.join(", ") || "",
    sourceCode: initialData?.sourceCode || "",
  });

  const [domainInput, setDomainInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { dark } = useTheme();

  const bg = dark ? "#0f0f0f" : "#fafafa";
  const cardBg = dark ? "#141414" : "#ffffff";
  const border = dark ? "#262626" : "#e5e7eb";
  const textMain = dark ? "#f5f5f5" : "#111111";
  const textMuted = dark ? "#a3a3a3" : "#6b7280";
  const inputBg = dark ? "#1a1a1a" : "#fafafa";
  const mutedBg = dark ? "#1f1f1f" : "#f4f4f5";

  const fieldStyle = {
    backgroundColor: inputBg,
    border: `1px solid ${border}`,
    color: textMain,
  };

  const isEdit = Boolean(initialData);

  const filteredSuggestions = DOMAIN_SUGGESTIONS.filter(
    (d) => d.toLowerCase().includes(domainInput.toLowerCase()) && !form.domains.includes(d)
  );

  const addDomain = (domain) => {
    setForm((prev) => ({ ...prev, domains: [...prev.domains, domain] }));
    setDomainInput("");
    setShowSuggestions(false);
  };

  const removeDomain = (domain) => {
    setForm((prev) => ({ ...prev, domains: prev.domains.filter((d) => d !== domain) }));
  };

  const handleSubmit = async () => {
    if (form.domains.length === 0) return setError("Please select at least one domain");
    if (!form.title.trim()) return setError("Title is required");
    if (!form.abstract.trim()) return setError("Abstract is required");

    setLoading(true);
    setError("");

    try {
      const payload = {
        title: form.title,
        abstract: form.abstract,
        domain: form.domains[0],
        links: form.links.split(",").map((l) => l.trim()).filter(Boolean),
        sourceCode: form.sourceCode,
      };

      if (isEdit) {
        await api.put(`/research/${initialData._id}`, payload);
      } else {
        await api.post("/research", payload);
      }

      onSuccess();
      onClose();
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-sm px-4 sm:px-6 overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="min-h-full flex items-start justify-center py-10">
        <div
          className="w-full max-w-xl rounded-2xl flex flex-col max-h-[90vh] overflow-hidden shadow-2xl"
          style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
        >
          {/* Header */}
          <div
            className="px-8 pt-8 pb-4 sticky top-0 z-10"
            style={{ backgroundColor: cardBg, borderBottom: `1px solid ${border}` }}
          >
            <h2 className="text-2xl font-serif italic" style={{ color: textMain }}>
              {isEdit ? "Edit Research" : "Publish Research"}
            </h2>
          </div>

          {/* Content */}
          <div className="px-8 py-6 overflow-y-auto flex flex-col gap-6">

            {/* Title */}
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Research title"
              className="rounded-md px-4 py-3 focus:outline-none transition placeholder:opacity-40"
              style={fieldStyle}
            />

            {/* Domain Selector */}
            <div className="relative">
              <input
                value={domainInput}
                onChange={(e) => { setDomainInput(e.target.value); setShowSuggestions(true); }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
                placeholder="Type domains (e.g. AI, Vision, Biotech)"
                className="w-full rounded-md px-4 py-3 focus:outline-none transition placeholder:opacity-40"
                style={fieldStyle}
              />

              {showSuggestions && domainInput && filteredSuggestions.length > 0 && (
                <div
                  className="absolute z-20 mt-1 w-full rounded-md shadow-sm max-h-48 overflow-y-auto"
                  style={{ backgroundColor: cardBg, border: `1px solid ${border}` }}
                >
                  {filteredSuggestions.map((d) => (
                    <button
                      key={d}
                      onMouseDown={() => addDomain(d)}  // ✅ fires before onBlur
                      className="w-full text-left px-4 py-2 text-sm transition"
                      style={{ color: textMain }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = mutedBg}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              )}

              {form.domains.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.domains.map((d) => (
                    <span
                      key={d}
                      className="flex items-center gap-2 px-3 py-1 text-xs rounded-md"
                      style={{ backgroundColor: mutedBg, border: `1px solid ${border}`, color: textMain }}
                    >
                      {d}
                      <button
                        onClick={() => removeDomain(d)}
                        style={{ color: textMuted }}
                        onMouseEnter={(e) => e.currentTarget.style.color = textMain}
                        onMouseLeave={(e) => e.currentTarget.style.color = textMuted}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Abstract */}
            <textarea
              value={form.abstract}
              onChange={(e) => setForm({ ...form, abstract: e.target.value })}
              placeholder="Abstract"
              rows={5}
              className="rounded-md px-4 py-3 resize-none focus:outline-none transition placeholder:opacity-40"
              style={fieldStyle}
            />

            {/* Links */}
            <input
              value={form.links}
              onChange={(e) => setForm({ ...form, links: e.target.value })}
              placeholder="Reference links (comma separated)"
              className="rounded-md px-4 py-3 focus:outline-none transition placeholder:opacity-40"
              style={fieldStyle}
            />

            {/* Source Code */}
            <input
              value={form.sourceCode}
              onChange={(e) => setForm({ ...form, sourceCode: e.target.value })}
              placeholder="Source code URL (optional)"
              className="rounded-md px-4 py-3 focus:outline-none transition placeholder:opacity-40"
              style={fieldStyle}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          {/* Actions */}
          <div
            className="px-8 py-4 sticky bottom-0 flex justify-end gap-3"
            style={{ backgroundColor: cardBg, borderTop: `1px solid ${border}` }}
          >
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm transition"
              style={{ border: `1px solid ${border}`, color: textMain }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = mutedBg}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 rounded-md font-bold transition disabled:opacity-60"
              style={{ backgroundColor: "#f5c400", color: "#000" }}
            >
              {loading ? "Submitting..." : isEdit ? "Update Research" : "Publish Research"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}