import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#020617",
        cyber: {
          cyan: "#22d3ee",
          emerald: "#34d399",
          violet: "#a855f7",
          blue: "#38bdf8",
        },
      },
      boxShadow: {
        "cyan-glow": "0 0 34px rgba(34, 211, 238, 0.34)",
        "emerald-glow": "0 0 34px rgba(52, 211, 153, 0.28)",
        "violet-glow": "0 0 42px rgba(168, 85, 247, 0.28)",
        "glass": "inset 0 1px 0 rgba(255,255,255,.08), 0 24px 80px rgba(0,0,0,.45)",
      },
      animation: {
        "border-beam": "borderBeam 3.4s linear infinite",
        "orb-float": "orbFloat 12s ease-in-out infinite",
        grid: "gridMove 18s linear infinite",
      },
      keyframes: {
        borderBeam: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        orbFloat: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(-34px, 24px, 0) scale(1.08)" },
        },
        gridMove: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(48px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
