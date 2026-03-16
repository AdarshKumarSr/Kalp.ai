import { useState, useEffect, useRef } from "react";
import SpaceCanvas from "../../components/space/SpaceCanvas";
import { footerPlanets } from "../../components/space/footerPlanets";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { dark } = useTheme();
  const footerRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // ✅ THE REAL FIX: directly set colors based on theme state
  const bg = dark ? "#0f0f0f" : "#fafafa";
  const fieldBg = dark ? "#1a1a1a" : "#f4f4f4";
  const border = dark ? "#262626" : "#e5e7eb";
  const textMain = dark ? "#f5f5f5" : "#111111";
  const textMuted = dark ? "#a3a3a3" : "#6b7280";
  const btnBg = dark ? "#f5f5f5" : "#111111";
  const btnText = dark ? "#111111" : "#f5f5f5";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "5c39e495-f286-4516-9fc3-4ff46e83aafd",
          name: form.name,
          email: form.email,
          message: form.message,
          subject: "Footer Inquiry - Kalp Lab",
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error("Submission failed");

      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    backgroundColor: fieldBg,
    border: `1px solid ${border}`,
    color: textMain,
  };

  // At the top of your return, inside the footer:
  <div className="absolute inset-0 z-0 pointer-events-none">
    <SpaceCanvas
      planetrees={footerPlanets}
      clearColor={dark ? "#0f0f0f" : "#fafafa"}
    />
  </div>

  return (
    <footer
      className="relative w-full px-6 py-32 overflow-hidden"
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${border}`,
      }}
    >
      {/* BACKGROUND PLANETS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SpaceCanvas planets={footerPlanets} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-10">

        {/* Icon */}
        <div
          className="size-14 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#f5c400" }}
        >
          <span className="material-symbols-outlined text-xl" style={{ color: "#000" }}>
            mail
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl font-serif italic"
          style={{ color: textMain }}
        >
          Let's connect.
        </h2>

        {/* Subtext */}
        <p className="max-w-md" style={{ color: textMuted }}>
          Have a question or idea? Send us a quick inquiry.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">

          <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="h-12 px-6 rounded-full focus:outline-none transition"
            style={fieldStyle}
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="h-12 px-6 rounded-full focus:outline-none transition"
            style={fieldStyle}
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange}
            className="px-6 py-4 rounded-xl focus:outline-none transition resize-none"
            style={fieldStyle}
          />

          <button
            type="submit"
            disabled={loading}
            className="h-12 px-8 rounded-full font-semibold transition-colors disabled:opacity-60"
            style={{ backgroundColor: btnBg, color: btnText }}
          >
            {loading ? "Sending..." : "Send Inquiry"}
          </button>

          {success && (
            <p className="text-green-500 text-sm text-center mt-2">
              ✔ Inquiry sent successfully. I'll get bsack to you soon!
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              ✖ Something went wrong. Please try again.
            </p>
          )}
        </form>

        {/* Footer Bottom */}
        <div className="text-xs mt-6" style={{ color: textMuted }}>
          © 2024 Kalp Lab. All rights reserved.
        </div>

      </div>
    </footer>
  );
}