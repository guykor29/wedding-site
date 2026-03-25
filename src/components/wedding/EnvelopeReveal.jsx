import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "/logo.png";

// Ornamental corner SVG for the doors
function DoorOrnament({ flip }) {
  return (
    <svg
      width="80" height="80" viewBox="0 0 80 80"
      style={{ transform: flip ? "scaleX(-1)" : undefined, opacity: 0.25 }}
    >
      <path d="M10,70 Q10,10 70,10" fill="none" stroke="#9C8465" strokeWidth="0.8" />
      <path d="M18,70 Q18,18 70,18" fill="none" stroke="#9C8465" strokeWidth="0.5" />
      <circle cx="12" cy="12" r="2" fill="#9C8465" opacity="0.4" />
      <path d="M8,60 Q8,8 60,8" fill="none" stroke="#9C8465" strokeWidth="0.3" />
    </svg>
  );
}

// Shimmer light particles for the reveal
function createSparkles(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 80 + Math.random() * 200;
    return {
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      size: 2 + Math.random() * 4,
      delay: Math.random() * 0.5,
      duration: 0.8 + Math.random() * 0.6,
    };
  });
}

export default function EnvelopeReveal({ onReveal }) {
  const [stage, setStage] = useState("idle");
  // idle → shimmer → opening → reveal → text → exit
  const sparkles = useMemo(() => createSparkles(24), []);

  useEffect(() => {
    const timers = [];
    timers.push(setTimeout(() => setStage("shimmer"), 500));
    timers.push(setTimeout(() => setStage("opening"), 2200));
    timers.push(setTimeout(() => setStage("reveal"), 3600));
    timers.push(setTimeout(() => setStage("text"), 4400));
    timers.push(setTimeout(() => setStage("exit"), 6000));
    timers.push(setTimeout(() => onReveal(), 7000));
    return () => timers.forEach(clearTimeout);
  }, []);

  const isOpening = stage === "opening" || stage === "reveal" || stage === "text" || stage === "exit";
  const isRevealed = stage === "reveal" || stage === "text" || stage === "exit";
  const showText = stage === "text" || stage === "exit";

  return (
    <AnimatePresence>
      {stage !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#FDFCF8" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* AMBIENT RADIAL GLOW */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: "160vmax",
              height: "160vmax",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(196,169,125,0.12) 0%, rgba(156,132,101,0.04) 40%, transparent 65%)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={stage !== "idle" ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 2.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* LEFT DOOR */}
          <motion.div
            className="absolute top-0 left-0 bottom-0 z-20"
            style={{ width: "50.3%" }}
            initial={{ x: 0 }}
            animate={isOpening ? { x: "-102%" } : { x: 0 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0" style={{
              background: "linear-gradient(135deg, #EBE4D8 0%, #DDD5C7 30%, #D1C8B8 60%, #C8BEA8 100%)",
            }} />
            <div className="absolute inset-3 md:inset-6 pointer-events-none" style={{
              border: "0.5px solid rgba(156,132,101,0.2)",
            }} />
            <div className="absolute inset-6 md:inset-12 pointer-events-none" style={{
              border: "0.5px solid rgba(156,132,101,0.12)",
            }} />
            <div className="absolute top-4 left-4 md:top-8 md:left-8"><DoorOrnament /></div>
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8" style={{ transform: "rotate(180deg)" }}><DoorOrnament /></div>
            <div className="absolute top-0 right-0 bottom-0" style={{
              width: 3,
              background: "linear-gradient(to right, transparent, rgba(156,132,101,0.2))",
            }} />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ right: 16 }}
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ width: 3, height: 40, borderRadius: 2, backgroundColor: "#9C8465", opacity: 0.3 }} />
            </motion.div>
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            className="absolute top-0 right-0 bottom-0 z-20"
            style={{ width: "50.3%" }}
            initial={{ x: 0 }}
            animate={isOpening ? { x: "102%" } : { x: 0 }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0" style={{
              background: "linear-gradient(225deg, #EBE4D8 0%, #DDD5C7 30%, #D1C8B8 60%, #C8BEA8 100%)",
            }} />
            <div className="absolute inset-3 md:inset-6 pointer-events-none" style={{
              border: "0.5px solid rgba(156,132,101,0.2)",
            }} />
            <div className="absolute inset-6 md:inset-12 pointer-events-none" style={{
              border: "0.5px solid rgba(156,132,101,0.12)",
            }} />
            <div className="absolute top-4 right-4 md:top-8 md:right-8"><DoorOrnament flip /></div>
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8" style={{ transform: "rotate(180deg)" }}><DoorOrnament flip /></div>
            <div className="absolute top-0 left-0 bottom-0" style={{
              width: 3,
              background: "linear-gradient(to left, transparent, rgba(156,132,101,0.2))",
            }} />
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              style={{ left: 16 }}
              animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ width: 3, height: 40, borderRadius: 2, backgroundColor: "#9C8465", opacity: 0.3 }} />
            </motion.div>
          </motion.div>

          {/* CENTER SEAM */}
          <motion.div
            className="absolute top-0 bottom-0 z-30"
            style={{ left: "50%", width: 1, transform: "translateX(-50%)", backgroundColor: "rgba(156,132,101,0.2)" }}
            animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* SHIMMER LINE */}
          <motion.div
            className="absolute z-30 pointer-events-none"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: 2,
              background: "linear-gradient(to bottom, transparent, rgba(212,188,148,0.9) 40%, rgba(196,169,125,1) 50%, rgba(212,188,148,0.9) 60%, transparent)",
              filter: "blur(1px)",
            }}
            initial={{ height: 0, top: "50%", opacity: 0 }}
            animate={
              stage === "shimmer"
                ? [
                    { height: 0, top: "50%", opacity: 1 },
                    { height: "80%", top: "10%", opacity: 1 },
                    { height: "100%", top: "0%", opacity: 0.6 },
                  ]
                : stage === "opening"
                  ? { height: "100%", top: "0%", opacity: 0 }
                  : { height: 0, top: "50%", opacity: 0 }
            }
            transition={
              stage === "shimmer"
                ? { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], times: [0, 0.6, 1] }
                : { duration: 0.3 }
            }
          />

          {/* SHIMMER GLOW */}
          <motion.div
            className="absolute z-25 pointer-events-none"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              width: 40,
              height: "100%",
              background: "radial-gradient(ellipse 100% 50% at center, rgba(196,169,125,0.3) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
            initial={{ opacity: 0 }}
            animate={
              stage === "shimmer" ? { opacity: [0, 0.8, 0.6] }
                : isOpening ? { opacity: [0.6, 0] }
                  : { opacity: 0 }
            }
            transition={{ duration: stage === "shimmer" ? 1.5 : 0.8 }}
          />

          {/* LIGHT BURST */}
          <motion.div
            className="absolute z-15 pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 8,
              height: "120%",
              background: "radial-gradient(ellipse 100% 50% at center, rgba(212,188,148,0.6) 0%, rgba(196,169,125,0.2) 40%, transparent 70%)",
              filter: "blur(12px)",
            }}
            initial={{ scaleX: 1, opacity: 0 }}
            animate={
              isOpening
                ? [{ scaleX: 1, opacity: 0.9 }, { scaleX: 80, opacity: 0 }]
                : { scaleX: 1, opacity: 0 }
            }
            transition={isOpening ? { duration: 1.4, ease: "easeOut", times: [0, 1] } : { duration: 0 }}
          />

          {/* SPARKLE PARTICLES */}
          <AnimatePresence>
            {isOpening && sparkles.map((s) => (
              <motion.div
                key={s.id}
                className="absolute z-25 rounded-full"
                style={{
                  width: s.size,
                  height: s.size,
                  left: "50%",
                  top: "50%",
                  background: "radial-gradient(circle, rgba(212,188,148,0.9), rgba(196,169,125,0.5))",
                  boxShadow: "0 0 4px rgba(196,169,125,0.5)",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{
                  x: s.x,
                  y: s.y,
                  opacity: [0, 1, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />
            ))}
          </AnimatePresence>

          {/* CENTER CONTENT */}
          <div className="absolute flex flex-col items-center justify-center z-10">
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 220,
                height: 220,
                background: "radial-gradient(circle, rgba(196,169,125,0.15) 0%, transparent 65%)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isRevealed ? { scale: 1.8, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            <motion.img
              src={LOGO_URL}
              alt="לוגו שני וגיא"
              style={{ width: 100, height: 100, objectFit: "contain" }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            />

            <div className="flex items-center gap-4 mt-5">
              <motion.div
                style={{ height: 0.5, backgroundColor: "#9C8465", opacity: 0.4 }}
                initial={{ width: 0 }}
                animate={showText ? { width: 40 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              />
              <motion.p
                className="font-serif text-2xl md:text-3xl font-light tracking-wider"
                style={{ color: "#3D3832" }}
                initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                animate={showText ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 15, filter: "blur(4px)" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                שני & גיא
              </motion.p>
              <motion.div
                style={{ height: 0.5, backgroundColor: "#9C8465", opacity: 0.4 }}
                initial={{ width: 0 }}
                animate={showText ? { width: 40 } : { width: 0 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
              />
            </div>

            <motion.p
              className="font-sans text-xs tracking-[0.3em] mt-3"
              style={{ color: "#9C8465" }}
              initial={{ opacity: 0, y: 10 }}
              animate={showText ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              17.05.2026
            </motion.p>

            <motion.p
              className="font-serif text-sm tracking-[0.35em] uppercase mt-4 font-light"
              style={{ color: "#3D3832", opacity: 0.5 }}
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={showText ? { opacity: 0.5, letterSpacing: "0.35em" } : { opacity: 0, letterSpacing: "0.5em" }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              Our Wedding
            </motion.p>
          </div>

          {/* TAGLINE ON DOORS */}
          <motion.div
            className="absolute z-30 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={
              stage === "shimmer" ? { opacity: 1 }
                : isOpening ? { opacity: 0 }
                  : { opacity: 0 }
            }
            transition={{ duration: 0.8 }}
          >
            <p
              className="font-sans text-xs tracking-[0.35em] uppercase"
              style={{ color: "#9C8465" }}
            >
              ההזמנה שלנו
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
