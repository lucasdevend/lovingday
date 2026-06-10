"use client";

import { motion } from "framer-motion";

const hearts = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 12 + 8,
  duration: Math.random() * 8 + 10,
  delay: Math.random() * 5,
}));

export default function FloatingHearts() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-red-500/20"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
          initial={{
            y: "110vh",
            opacity: 0,
          }}
          animate={{
            y: "-120vh",
            opacity: [0, 0.3, 0.3, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}