import React from "react";
import { motion } from "framer-motion";

const LOGO_URL = "/logo.png";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#F5F0E8" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(139,115,85,0.06) 0%, transparent 80%)",
        }}
      />

      {/* Breathing logo */}
      <motion.img
        src={LOGO_URL}
        alt="לוגו שני וגיא"
        className="w-20 h-20 object-contain"
        style={{ filter: "drop-shadow(0 2px 12px rgba(139,115,85,0.2))" }}
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Names */}
      <motion.p
        className="font-serif text-xl font-normal tracking-wider mt-4"
        style={{ color: "#3D3832" }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        שני & גיא
      </motion.p>

      {/* Gold progress line */}
      <div className="relative mt-8 overflow-hidden rounded-full" style={{ width: 120, height: 1.5 }}>
        <div className="absolute inset-0" style={{ backgroundColor: "#D9D1C2" }} />
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ backgroundColor: "#8B7355" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
