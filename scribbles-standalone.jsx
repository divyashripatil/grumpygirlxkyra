// Decorative SVGs for grumpy / kyra mascot energy
const { useEffect, useRef, useState } = React;

// ----- Coffee cup with steam -----
const Scribble2 = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 90 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 50 L 22 100 q 0 12 12 12 l 22 0 q 12 0 12 -12 l 2 -50 Z"
      stroke="#3D0808" strokeWidth="2.5" fill="#F5C84B" strokeLinejoin="round" />
    <path d="M68 60 q 12 0 12 12 t -12 12" stroke="#3D0808" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <path d="M32 28 q -5 8 0 16 q 5 -8 0 -16" stroke="#C2502A" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <animate attributeName="d" dur="2.2s" repeatCount="indefinite"
        values="M32 28 q -5 8 0 16 q 5 -8 0 -16;M32 24 q -6 8 0 16 q 6 -8 0 -16;M32 28 q -5 8 0 16 q 5 -8 0 -16" />
    </path>
    <path d="M46 18 q -5 8 0 16 q 5 -8 0 -16" stroke="#C2502A" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <animate attributeName="d" dur="2.6s" repeatCount="indefinite"
        values="M46 18 q -5 8 0 16 q 5 -8 0 -16;M46 14 q -6 8 0 16 q 6 -8 0 -16;M46 18 q -5 8 0 16 q 5 -8 0 -16" />
    </path>
    <path d="M60 28 q -5 8 0 16 q 5 -8 0 -16" stroke="#C2502A" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
        values="M60 28 q -5 8 0 16 q 5 -8 0 -16;M60 24 q -6 8 0 16 q 6 -8 0 -16;M60 28 q -5 8 0 16 q 5 -8 0 -16" />
    </path>
  </svg>
);

// ----- Sparkle (4-point) -----
const Sparkle = ({ className, style, color = "#F5C84B" }) => (
  <svg className={className} style={style} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M20 4 L 22 18 L 36 20 L 22 22 L 20 36 L 18 22 L 4 20 L 18 18 Z"
      fill={color} stroke="#3D0808" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

// ----- Coffee bean -----
const CoffeeBean = ({ className, style, color = "#3D0808" }) => (
  <svg className={className} style={style} viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="15" cy="20" rx="10" ry="14" fill={color} />
    <path d="M 15 7 Q 11 20 15 33" stroke="#F4D5A3" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

// ----- Star burst -----
const StarBurst = ({ className, style, color = "#C2502A" }) => (
  <svg className={className} style={style} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <line x1="30" y1="6" x2="30" y2="20" />
      <line x1="30" y1="40" x2="30" y2="54" />
      <line x1="6" y1="30" x2="20" y2="30" />
      <line x1="40" y1="30" x2="54" y2="30" />
      <line x1="13" y1="13" x2="22" y2="22" />
      <line x1="38" y1="38" x2="47" y2="47" />
      <line x1="13" y1="47" x2="22" y2="38" />
      <line x1="38" y1="22" x2="47" y2="13" />
    </g>
    <circle cx="30" cy="30" r="4" fill={color} />
  </svg>
);

// ----- Auto-rickshaw shadow silhouette (uses uploaded asset) -----
const AutoRickshaw = ({ className, style }) => (
  <img
    src=window.__resources.autoRickshaw
    alt=""
    aria-hidden="true"
    className={"auto-rickshaw " + (className || "")}
    style={style}
  />
);

// ----- Broken phone -----
const BrokenPhone = ({ className, style, color = "#3D0808" }) => (
  <svg className={className} style={style} viewBox="0 0 80 130" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="10" y="6" width="60" height="120" rx="10" />
    {/* speaker */}
    <line x1="33" y1="15" x2="47" y2="15" />
    {/* home button */}
    <circle cx="40" cy="118" r="2.5" fill={color} />
    {/* shattered glass cracks */}
    <path d="M 18 32 L 32 50 L 22 68 L 42 75 L 36 96 L 56 92" />
    <path d="M 30 20 L 50 44 L 40 62" />
    <path d="M 50 22 L 38 36" />
    <path d="M 52 60 L 60 70" />
  </svg>
);

// ----- Sugar/glass bottle with shards -----
const SugarBottle = ({ className, style, color = "#3D0808" }) => (
  <svg className={className} style={style} viewBox="0 0 100 110" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* cap */}
    <rect x="34" y="6" width="32" height="9" fill={color} />
    {/* bottle neck */}
    <path d="M 38 15 L 38 26" />
    <path d="M 62 15 L 62 26" />
    {/* bottle body */}
    <path d="M 38 26 Q 22 30 22 50 L 22 90 Q 22 100 32 100 L 68 100 Q 78 100 78 90 L 78 50 Q 78 30 62 26" />
    {/* big crack */}
    <path d="M 30 42 L 44 56 L 36 72 L 48 82" />
    <path d="M 44 56 L 56 50" />
    {/* shards */}
    <polygon points="84,72 90,68 88,80" fill={color} />
    <polygon points="92,88 98,82 100,92" fill={color} />
    <polygon points="6,82 12,76 10,90" fill={color} />
    <polygon points="14,96 20,92 18,102" fill={color} />
  </svg>
);

// ----- Matcha cup -----
const MatchaCup = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 90 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* cup body */}
    <path d="M 18 32 L 22 82 Q 22 92 32 92 L 56 92 Q 66 92 66 82 L 70 32 Z" fill="#9EBF6D" stroke="#3D0808" strokeWidth="2.2" />
    {/* matcha surface (top ellipse) */}
    <ellipse cx="44" cy="32" rx="26" ry="5" fill="#7A9C52" stroke="#3D0808" strokeWidth="2" />
    {/* foam dots */}
    <circle cx="36" cy="31" r="1.6" fill="#D9E8B8" />
    <circle cx="48" cy="33" r="1.2" fill="#D9E8B8" />
    <circle cx="54" cy="31" r="1" fill="#D9E8B8" />
    {/* handle */}
    <path d="M 66 48 Q 80 50 80 62 Q 80 74 66 76" stroke="#3D0808" strokeWidth="2.2" />
    {/* saucer */}
    <ellipse cx="44" cy="92" rx="34" ry="5" stroke="#3D0808" strokeWidth="2" fill="none" />
    {/* leaf accent */}
    <path d="M 28 18 Q 36 8 44 14 Q 38 24 28 18 Z" fill="#9EBF6D" stroke="#3D0808" strokeWidth="1.5" />
  </svg>
);

// ----- Cigarette / impulsive tattoo sticky note SVG decoration -----
const StickyImpulse = ({ className, style, text = "IMPULSIVE TATTOO →" }) => (
  <div className={"sticky-impulse " + (className || "")} style={style} aria-hidden="true">
    {text}
  </div>
);

// ----- Interactive "grumpy" word -----
// Wraps the word "grumpy" with a hover wiggle + reveals the actual mascot above
const GrumpyWord = ({ children, className = "" }) => (
  <span className={"grumpy-word " + className}>
    <span className="gw-text">{children}</span>
    <img className="gw-face" src=window.__resources.mascotRust alt="" aria-hidden="true" />
    <span className="gw-puff" aria-hidden="true">
      <span></span><span></span><span></span>
    </span>
  </span>
);

// ----- Cursor follower sticker (per-button cycling) -----
const CursorSticker = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState("we ate");
  // Fallback rotation if a button has data-sticker="" (no custom label)
  const fallbacks = ["we ate", "iykyk", "no crumbs", "the lore", "she's right"];

  useEffect(() => {
    let idx = -1;
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onEnter = (e) => {
      const t = e.currentTarget;
      let custom = t?.dataset?.sticker;
      if (custom && custom.length > 0 && custom !== "true") {
        if (custom.includes("|")) {
          const opts = custom.split("|").map((s) => s.trim()).filter(Boolean);
          const i = parseInt(t.dataset.stickerIdx || "0", 10);
          setLabel(opts[i % opts.length]);
          t.dataset.stickerIdx = ((i + 1) % opts.length).toString();
        } else {
          setLabel(custom);
        }
      } else {
        idx = (idx + 1) % fallbacks.length;
        setLabel(fallbacks[idx]);
      }
      setShow(true);
    };
    const onLeave = () => setShow(false);

    window.addEventListener("mousemove", onMove);
    const attach = () => {
      document.querySelectorAll("[data-sticker]").forEach((el) => {
        if (el.dataset.stickerBound) return;
        el.dataset.stickerBound = "1";
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    attach();
    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <div className={"cursor-sticker " + (show ? "on" : "")} style={{ left: pos.x + 18, top: pos.y - 18 }}>
      {label}
    </div>
  );
};

// ----- Marching mascot walks across screen on a long loop -----
const MarchingMascot = () => (
  <div className="marching-mascot" aria-hidden="true">
    <img src=window.__resources.mascotCream alt="" />
  </div>
);

Object.assign(window, {
  Scribble2, Sparkle, CoffeeBean, StarBurst,
  AutoRickshaw, BrokenPhone, SugarBottle, MatchaCup, StickyImpulse,
  GrumpyWord, CursorSticker, MarchingMascot,
});
