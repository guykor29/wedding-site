import React, { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/wedding/ScrollReveal";
import PhotoLightbox from "../components/wedding/PhotoLightbox";

const PHOTOS = [
  {
    src: "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/3db1803ae_generated_e8a00f84.png",
    alt: "רגע ההצעה - חיבוק רומנטי על המרפסת",
    caption: "הרגע שבו הכל השתנה",
    aspect: "aspect-[3/4]",
  },
  {
    src: "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/7768aabf5_generated_1ae8ec1a.png",
    alt: "תקריב של ידיים שלובות עם טבעת אירוסין",
    caption: "אמרה כן",
    aspect: "aspect-[4/5]",
  },
  {
    src: "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/37e72a977_generated_b080a8f5.png",
    alt: "הזוג צוחקים יחד בגינה רומנטית",
    caption: "אושר טהור",
    aspect: "aspect-[3/2]",
  },
];

function GalleryImage({ photo, index, onClick }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-sm cursor-pointer ${photo.aspect}`}
      onClick={() => onClick(index)}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        className="w-full h-full object-cover transition-transform duration-700"
      />
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 flex items-end p-6 md:p-8"
        style={{
          background: "linear-gradient(to top, rgba(61,56,50,0.5) 0%, transparent 60%)",
        }}
      >
        <p className="font-serif text-lg text-white font-light">{photo.caption}</p>
      </div>
      {/* Subtle zoom icon hint */}
      <div className="absolute top-3 left-3 opacity-0 hover:opacity-60 transition-opacity duration-500">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.8)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3D3832" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Proposal() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="pt-24 pb-16">
      {/* Header */}
      <section className="text-center px-6 py-16 md:py-24">
        <motion.p
          className="font-sans text-xs tracking-[0.35em] uppercase mb-4"
          style={{ color: "#9C8465" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          הרגע המיוחד
        </motion.p>
        <motion.h1
          className="font-serif text-4xl md:text-6xl font-light"
          style={{ color: "#3D3832" }}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          ההצעה
        </motion.h1>
        <motion.div
          className="w-12 h-px mx-auto mt-6"
          style={{ backgroundColor: "#9C8465" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
      </section>

      {/* Romantic intro text */}
      <section className="max-w-xl mx-auto px-6 text-center mb-16 md:mb-24">
        <ScrollReveal>
          <p
            className="font-sans text-base md:text-lg font-light leading-[1.9]"
            style={{ color: "#3D3832", opacity: 0.7 }}
          >
            ברגע אחד הכל השתנה. שקיעה מושלמת, לב פועם,
            וברכיים שרועדות מהתרגשות. הרגע הכי יפה בחיים שלנו.
          </p>
        </ScrollReveal>
      </section>

      {/* Gallery */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Large photo */}
          <div className="md:col-span-7">
            <ScrollReveal>
              <GalleryImage photo={PHOTOS[0]} index={0} onClick={setLightboxIndex} />
            </ScrollReveal>
          </div>

          {/* Smaller photo */}
          <div className="md:col-span-5 md:pt-16">
            <ScrollReveal delay={0.2}>
              <GalleryImage photo={PHOTOS[1]} index={1} onClick={setLightboxIndex} />
            </ScrollReveal>
          </div>

          {/* Full width photo */}
          <div className="md:col-span-12">
            <ScrollReveal delay={0.1}>
              <div className="max-h-[500px]">
                <GalleryImage photo={PHOTOS[2]} index={2} onClick={setLightboxIndex} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="text-center px-6 py-20 md:py-28">
        <ScrollReveal>
          <p
            className="font-serif text-xl md:text-2xl font-light italic"
            style={{ color: "#9C8465" }}
          >
            ״וזה היה הרגע שבו ידענו — לנצח״
          </p>
        </ScrollReveal>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={PHOTOS}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
