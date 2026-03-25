import React, { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && hasNext) onNavigate(currentIndex + 1); // RTL: left = next
    if (e.key === "ArrowRight" && hasPrev) onNavigate(currentIndex - 1); // RTL: right = prev
  }, [currentIndex, hasNext, hasPrev, onClose, onNavigate]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  // Swipe support
  const touchStartX = React.useRef(0);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && hasNext) onNavigate(currentIndex + 1);
      if (diff < 0 && hasPrev) onNavigate(currentIndex - 1);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <motion.div
          className="absolute inset-0 bg-black/90"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-full transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <X className="w-6 h-6 text-white/80" />
        </button>

        {hasPrev && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute right-4 md:right-8 z-10 p-3 rounded-full transition-colors hidden md:flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", top: "50%" }}
          >
            <ChevronRight className="w-6 h-6 text-white/70" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute left-4 md:left-8 z-10 p-3 rounded-full transition-colors hidden md:flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", top: "50%" }}
          >
            <ChevronLeft className="w-6 h-6 text-white/70" />
          </button>
        )}

        <motion.div
          key={currentIndex}
          className="relative z-10 max-w-[90vw] max-h-[85vh] flex flex-col items-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-sm"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
          />
          {photo.caption && (
            <motion.p
              className="font-serif text-base text-white/80 font-light mt-4 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {photo.caption}
            </motion.p>
          )}
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentIndex ? "#C4A97D" : "rgba(255,255,255,0.3)",
                transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
