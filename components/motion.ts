"use client";

import { motion, useReducedMotion } from "framer-motion";

export { motion };

export function useAccessibleMotion() {
  return useReducedMotion();
}

export const revealUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.19, 1, 0.22, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};
