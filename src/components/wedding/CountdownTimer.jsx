import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WEDDING_DATE = new Date("2026-05-17T19:30:00");
const EASE = [0.25, 0.46, 0.45, 0.94];

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 35, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const tileVariant = {
  hidden: { opacity: 0, scale: 0.7, y: 30 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: EASE },
  }),
};

// Animated digit that flips when value changes
function FlipDigit({ value }) {
  const display = String(value).padStart(2, "0");
  return (
    <AnimatePresence mode="popLayout">
      <motion.p
        key={display}
        className="font-serif text-3xl md:text-5xl font-bold leading-none"
        style={{ color: "#3D3832" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {display}
      </motion.p>
    </AnimatePresence>
  );
}

// Glass tile styles
const tileStyle = {
  background: "linear-gradient(135deg, rgba(232,224,210,0.7) 0%, rgba(232,224,210,0.4) 100%)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  border: "1px solid rgba(139,115,85,0.15)",
  boxShadow: "0 4px 24px rgba(139,115,85,0.08), inset 0 1px 0 rgba(255,255,255,0.3)",
  width: "clamp(70px, 18vw, 100px)",
  height: "clamp(70px, 18vw, 100px)",
};

export default function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { value: time.seconds, label: "שניות" },
    { value: time.minutes, label: "דקות" },
    { value: time.hours, label: "שעות" },
    { value: time.days, label: "ימים" },
  ];

  return (
    <motion.div className="text-center" variants={fadeUp}>
      <motion.h2
        className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-2"
        style={{ color: "#1A1714" }}
        variants={fadeUp}
      >
        COUNTDOWN
      </motion.h2>
      <motion.p
        className="font-sans text-sm mb-1"
        style={{ color: "#3D3832", opacity: 0.6 }}
        variants={fadeUp}
      >
        to the big day
      </motion.p>
      <motion.div
        className="w-12 h-px mx-auto mb-6"
        style={{ backgroundColor: "#8B7355", transformOrigin: "center" }}
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: { scaleX: 1, opacity: 1, transition: { duration: 1, ease: EASE } },
        }}
      />
      <div className="flex items-start gap-4 md:gap-6">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            className="flex flex-col items-center"
            custom={i}
            variants={tileVariant}
          >
            <motion.div
              className="flex items-center justify-center rounded-xl mb-2 overflow-hidden"
              style={tileStyle}
              whileHover={{
                boxShadow: "0 0 20px rgba(139,115,85,0.2), 0 4px 24px rgba(139,115,85,0.12), inset 0 1px 0 rgba(255,255,255,0.3)",
              }}
            >
              <FlipDigit value={unit.value} />
            </motion.div>
            <p
              className="font-sans text-xs tracking-wide"
              style={{ color: "#3D3832", opacity: 0.6 }}
            >
              {unit.label}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
