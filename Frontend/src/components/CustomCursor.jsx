import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [onText, setOnText] = useState(false);

  useEffect(() => {
    let rafId = null;
    let lastOnText = false;

    const move = (e) => {
      // throttle with rAF (VERY IMPORTANT)
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });

        const el = document.elementFromPoint(e.clientX, e.clientY);
        const isText =
          el &&
          ["P", "SPAN", "H1", "H2", "H3", "A", "LI"].includes(el.tagName);

        // only update if state actually changes
        if (isText !== lastOnText) {
          lastOnText = isText;
          setOnText(isText);
        }

        rafId = null;
      });
    };

    const down = () => setScale(1.12);
    const up = () => setScale(lastOnText ? 1.75 : 1);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed top-0 left-0
        pointer-events-none
        z-[9999]
        rounded-full
        transition-transform
        duration-500
        ease-[cubic-bezier(0.19,1,0.22,1)]
      "
      style={{
        width: 40,
        height: 40,
        transform: `
          translate(${pos.x}px, ${pos.y}px)
          translate(-50%, -50%)
          scale(${onText ? scale * 1.25 : scale})
        `,
        backgroundColor: "var(--cursor-bg)",
        backdropFilter: onText
          ? "brightness(1.1) saturate(1.15)"
          : "none",
        boxShadow: onText
          ? "0 0 0 1px var(--primary)"
          : "none",
      }}
    />
  );
}
