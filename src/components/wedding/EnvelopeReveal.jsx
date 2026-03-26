import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const LOGO_URL = "/logo.png";
const EASE = [0.25, 0.46, 0.45, 0.94];
const SNAPPY = [0.76, 0, 0.24, 1];

// Parchment colors
const PARCHMENT_LIGHT = "#E2D9CA";
const PARCHMENT = "#D5CCBB";
const PARCHMENT_DARK = "#C8BEAC";

const parchmentBg = `linear-gradient(145deg, ${PARCHMENT_LIGHT} 0%, ${PARCHMENT} 40%, ${PARCHMENT_DARK} 100%)`;

const textureStyle = {
  backgroundImage: `
    radial-gradient(ellipse at 20% 30%, rgba(139,115,85,0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(139,115,85,0.06) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(139,115,85,0.04) 1px, transparent 1px),
    radial-gradient(circle at 25% 75%, rgba(139,115,85,0.03) 1px, transparent 1px)
  `,
  backgroundSize: "100% 100%, 100% 100%, 14px 14px, 20px 20px",
};

export default function EnvelopeReveal({ onReveal }) {
  const [stage, setStage] = useState("idle");
  // idle → appear → shimmer → open → done
  const sealSize = typeof window !== "undefined" && window.innerWidth < 640 ? 80 : 110;
  const timersRef = useRef([]);
  const acceleratedRef = useRef(false);

  const addTimer = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay);
    timersRef.current.push(id);
    return id;
  }, []);

  // Tap to accelerate
  const accelerate = useCallback(() => {
    if (acceleratedRef.current) return;
    if (stage === "open" || stage === "done") return;
    acceleratedRef.current = true;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStage("open");
    addTimer(() => setStage("done"), 1800);
    addTimer(() => onReveal(), 1800);
  }, [stage, onReveal, addTimer]);

  // Auto timeline
  useEffect(() => {
    addTimer(() => setStage("appear"), 100);
    addTimer(() => setStage("shimmer"), 1500);
    addTimer(() => setStage("open"), 3500);
    addTimer(() => setStage("done"), 5500);
    addTimer(() => onReveal(), 5500);
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  const stageIndex = ["idle", "appear", "shimmer", "open", "done"].indexOf(stage);
  const appeared = stageIndex >= 1;
  const isOpen = stageIndex >= 3;
  const isDone = stageIndex >= 4;

  if (isDone) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ perspective: 1400, pointerEvents: "auto" }}
      onClick={accelerate}
    >
      {/* ===== TOP HALF - folds upward, carries the seal ===== */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: "50%",
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          zIndex: 3,
        }}
        initial={{ rotateX: 0 }}
        animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }}
        transition={{ duration: 1.6, ease: SNAPPY }}
      >
        {/* Front face - parchment with flap triangle lines */}
        <div
          className="absolute inset-0"
          style={{
            background: parchmentBg,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0" style={textureStyle} />

          {/* Flap fold lines on top half (V shape) */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: 0, left: 0, right: 0, height: "100%",
            }}
          >
            {/* Left diagonal line */}
            <div
              style={{
                position: "absolute",
                bottom: 0, left: 0,
                width: "72%", height: 1,
                background: "linear-gradient(90deg, transparent 5%, rgba(100,85,60,0.18) 40%, rgba(100,85,60,0.22) 100%)",
                transformOrigin: "bottom left",
                transform: "rotate(-35deg)",
              }}
            />
            {/* Right diagonal line */}
            <div
              style={{
                position: "absolute",
                bottom: 0, right: 0,
                width: "72%", height: 1,
                background: "linear-gradient(270deg, transparent 5%, rgba(100,85,60,0.18) 40%, rgba(100,85,60,0.22) 100%)",
                transformOrigin: "bottom right",
                transform: "rotate(35deg)",
              }}
            />
          </div>

          {/* Shadow at bottom fold edge */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: 25,
              background: "linear-gradient(to top, rgba(100,85,60,0.12), transparent)",
            }}
          />

          {/* === WAX SEAL (on the top half, at the bottom center) === */}
          <div
            className="absolute"
            style={{
              bottom: -sealSize / 2,
              left: "50%",
              marginLeft: -sealSize / 2,
              width: sealSize,
              height: sealSize,
              zIndex: 10,
            }}
          >
            <motion.div
              className="relative w-full h-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={appeared ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
            >
              {/* Shadow */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: -4,
                  background: "radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  transform: "translateY(4px)",
                }}
              />

              {/* Seal SVG */}
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
                <defs>
                  <radialGradient id="sealGrad" cx="38%" cy="35%">
                    <stop offset="0%" stopColor="#B8A680" />
                    <stop offset="40%" stopColor="#9C8666" />
                    <stop offset="100%" stopColor="#7A6448" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#sealGrad)" />
                <circle cx="50" cy="50" r="48" fill="none" stroke="#6B5A42" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(180,160,130,0.4)" strokeWidth="1" />
                <circle cx="50" cy="50" r="46" fill="none" stroke="#6B5A42" strokeWidth="0.7" strokeDasharray="2 2" />
                <circle cx="50" cy="50" r="37" fill="none" stroke="rgba(180,160,130,0.35)" strokeWidth="0.6" />
                <ellipse cx="38" cy="36" rx="16" ry="13" fill="rgba(255,255,255,0.1)" />
              </svg>

              {/* Logo */}
              <div
                className="absolute flex items-center justify-center"
                style={{ top: "16%", left: "16%", width: "68%", height: "68%" }}
              >
                <img
                  src={LOGO_URL}
                  alt=""
                  className="w-full h-full object-contain"
                  style={{
                    filter: "brightness(1.7) contrast(0.65) sepia(0.25)",
                    opacity: 0.75,
                  }}
                />
              </div>

              {/* Pulsing glow */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -16,
                  background: "radial-gradient(circle, rgba(180,160,130,0.3) 0%, transparent 70%)",
                  filter: "blur(8px)",
                }}
                animate={
                  !isOpen && appeared
                    ? { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }
                    : { opacity: 0 }
                }
                transition={
                  !isOpen
                    ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.2 }
                }
              />

              {/* Shimmer sweep */}
              <div className="absolute rounded-full overflow-hidden pointer-events-none" style={{ inset: 0, mixBlendMode: "overlay" }}>
                <motion.div
                  style={{
                    width: "200%", height: "100%",
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 55%, transparent 70%)",
                  }}
                  animate={appeared && !isOpen ? { x: ["-100%", "100%"] } : {}}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${PARCHMENT_DARK} 0%, #B8AE9A 100%)`,
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        />
      </motion.div>

      {/* ===== BOTTOM HALF - folds downward ===== */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "50%",
          transformOrigin: "bottom center",
          transformStyle: "preserve-3d",
          zIndex: 2,
        }}
        initial={{ rotateX: 0 }}
        animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
        transition={{ duration: 1.6, delay: isOpen ? 0.08 : 0, ease: SNAPPY }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0"
          style={{
            background: parchmentBg,
            backfaceVisibility: "hidden",
          }}
        >
          <div className="absolute inset-0" style={textureStyle} />

          {/* Flap fold lines on bottom half (inverted V) */}
          <div className="absolute pointer-events-none" style={{ top: 0, left: 0, right: 0, height: "100%" }}>
            <div
              style={{
                position: "absolute",
                top: 0, left: 0,
                width: "72%", height: 1,
                background: "linear-gradient(90deg, transparent 5%, rgba(100,85,60,0.18) 40%, rgba(100,85,60,0.22) 100%)",
                transformOrigin: "top left",
                transform: "rotate(35deg)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0, right: 0,
                width: "72%", height: 1,
                background: "linear-gradient(270deg, transparent 5%, rgba(100,85,60,0.18) 40%, rgba(100,85,60,0.22) 100%)",
                transformOrigin: "top right",
                transform: "rotate(-35deg)",
              }}
            />
          </div>

          {/* Shadow at top fold edge */}
          <div
            className="absolute top-0 left-0 right-0 pointer-events-none"
            style={{
              height: 25,
              background: "linear-gradient(to bottom, rgba(100,85,60,0.1), transparent)",
            }}
          />
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(0deg, ${PARCHMENT_DARK} 0%, #B8AE9A 100%)`,
            backfaceVisibility: "hidden",
            transform: "rotateX(180deg)",
          }}
        />
      </motion.div>

      {/* Horizontal center line (where the two halves meet) */}
      <motion.div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          top: "50%",
          height: 1,
          background: "linear-gradient(90deg, transparent 5%, rgba(100,85,60,0.2) 20%, rgba(100,85,60,0.25) 50%, rgba(100,85,60,0.2) 80%, transparent 95%)",
          zIndex: 5,
          marginTop: -0.5,
        }}
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
