import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const { dark } = useTheme();

  const cardBg  = dark ? "#141414" : "#ffffff";
  const border  = dark ? "#262626" : "#e5e7eb";
  const mutedBg = dark ? "#1a1a1a" : "#f4f4f4";
  const textMain = dark ? "#f5f5f5" : "#111111";

  return (
    <>
      <section
        className="flex justify-center px-6 py-20"
        style={{ backgroundColor: "var(--bg-main)", color: "var(--text-main)" }}
      >
        <div className="max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

          {/* ===== Left Content ===== */}
          <div className="flex flex-col gap-8 max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-app bg-card/60 w-fit">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs uppercase text-muted">
                Research Platform · Beta
              </span>
            </span>

            <h1 className="text-6xl lg:text-7xl font-serif italic leading-tight">
              A Space to <br />
              <span className="border-b-4 border-primary/60">
                Share & Explore Research.
              </span>
            </h1>

            <p className="text-muted text-lg max-w-md">
              Publish research openly or explore work shared by the community.
            </p>

            <div className="flex gap-4">
              <Link to="/research">
                <button className="h-12 px-8 rounded-full bg-primary text-black font-medium hover:opacity-90 transition">
                  Explore the Lab
                </button>
              </Link>

              {/* ✅ ONLY THIS BUTTON CHANGED */}
              <button
                onClick={() => setOpen(true)}
                className="h-12 px-8 rounded-full transition"
                style={{
                  backgroundColor: cardBg,
                  border: `1px solid ${border}`,
                  color: textMain,
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = mutedBg}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = cardBg}
              >
                Learn More
              </button>
            </div>
          </div>

          {/* ===== Right Visual ===== */}
          <div className="relative h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 border border-app rounded-full opacity-20 scale-90"></div>

            <div
              className="w-full h-full bg-contain bg-no-repeat bg-center animate-float"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBYwV3I9svl3zO2lJhubZX76bzugLGyL9ZA12_MxfvKJJ3xtacDgIzm-8o_zAjy2iky4WCNk_G3Ein2td1CiyTDJwtM80awT_e5F0Tae1cfifoBIMyx6jixMqxKkoJl1-rlXL2-CG7lCZfFvzW7KzEvnCz0-zuQzReMsEq6qUysE2ZqNt1PBHXTBg4GhOCvQ-KtYVXJKQOR9Fzk9xTeK0gJ5Kq-99x3o2KplPVyMP4mY4Su4SlgkgYu5qthTls7pfhQM44kERhXvy0")',
              }}
            />
          </div>
        </div>
      </section>

      {open && <HeroPreview onClose={() => setOpen(false)} />}
    </>
  );
}