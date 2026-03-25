import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";
import EnvelopeReveal from "../components/wedding/EnvelopeReveal";
import CountdownTimer from "../components/wedding/CountdownTimer";
import ScrollReveal from "../components/wedding/ScrollReveal";

const HERO_IMAGE = "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/b3fb92277_generated_f8163fbf.png";
const VENUE_IMAGE = "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/6e9b87ef6_generated_3caef906.png";
const LOGO_URL = "/logo.png";

const WAZE_URL = "https://waze.com/ul?q=אליעזר+מזל+6+ראשון+לציון&navigate=yes";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Eliezer+Mazal+6+Rishon+LeZion";

const staggerItem = (delay) => ({
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function Home() {
  const [sealOpen, setSealOpen] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);

  return (
    <>
      {!sealOpen && <EnvelopeReveal onReveal={() => setSealOpen(true)} />}

      {sealOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ backgroundColor: "#FAF8F4", minHeight: "100vh" }}
        >

          {/* HERO */}
          <div ref={heroRef}>
            <ScrollReveal delay={0.1}>
              <div className="relative pt-16" style={{ marginBottom: "14rem" }}>
                <div className="overflow-hidden relative" style={{ borderRadius: 0 }}>
                  <motion.img
                    src={HERO_IMAGE}
                    alt="תמונת הזוג"
                    className="w-full object-cover"
                    style={{
                      height: "75vw",
                      maxHeight: 560,
                      objectPosition: "center 20%",
                      y: heroImageY,
                      willChange: "transform",
                    }}
                  />
                  <div className="absolute top-0 left-0 right-0" style={{
                    height: "45%",
                    background: "linear-gradient(to bottom, #FAF8F4 0%, transparent 100%)",
                  }} />
                  <div className="absolute bottom-0 left-0 right-0" style={{
                    height: "45%",
                    background: "linear-gradient(to bottom, transparent 0%, #FAF8F4 100%)",
                  }} />
                </div>

                <div className="absolute left-0 right-0 flex flex-col items-center" style={{ bottom: "-13rem" }}>
                  <motion.img
                    src={LOGO_URL}
                    alt="לוגו שני וגיא"
                    className="w-20 h-20 object-contain"
                    style={{
                      filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.10))",
                      scale: logoScale,
                      opacity: logoOpacity,
                      willChange: "transform",
                    }}
                  />
                  <motion.p
                    className="font-serif text-5xl font-light tracking-wider text-center mt-3"
                    style={{ color: "#1A1714" }}
                    {...staggerItem(0.15)}
                  >
                    Shani & Guy
                  </motion.p>
                  <motion.div
                    className="w-12 h-px my-2"
                    style={{ backgroundColor: "#9C8465", opacity: 0.6 }}
                    {...staggerItem(0.3)}
                  />
                  <motion.p
                    className="font-sans text-base tracking-[0.25em] text-center"
                    style={{ color: "#9C8465" }}
                    {...staggerItem(0.45)}
                  >
                    17.05.2026
                  </motion.p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* COUNTDOWN */}
          <ScrollReveal>
            <div className="text-center px-6 mb-10">
              <p
                className="font-sans text-xs tracking-[0.35em] uppercase mb-6"
                style={{ color: "#9C8465" }}
              >
                ספירה לאחור
              </p>
              <div className="flex justify-center">
                <CountdownTimer />
              </div>
            </div>
          </ScrollReveal>

          <div className="mx-8 h-px mb-10" style={{ backgroundColor: "#D6CFBF" }} />

          {/* LOCATION */}
          <ScrollReveal>
            <div className="text-center px-8 mb-6">
              <p
                className="font-sans text-xs tracking-[0.35em] uppercase mb-4"
                style={{ color: "#9C8465" }}
              >
                המקום
              </p>
              <h2
                className="font-serif mb-2"
                style={{ color: "#1A1714", fontSize: "clamp(1.8rem, 9vw, 3rem)", fontWeight: 300 }}
              >
                תרין
              </h2>
              <p
                className="font-sans text-sm font-light mb-2"
                style={{ color: "#3D3832", opacity: 0.6 }}
              >
                רחוב אליעזר מזל 6, ראשון לציון
              </p>
            </div>
          </ScrollReveal>

          {/* Venue image */}
          <ScrollReveal delay={0.1}>
            <div className="max-w-3xl mx-auto px-6 mb-8">
              <div className="relative overflow-hidden rounded-sm aspect-[16/9]">
                <img
                  src={VENUE_IMAGE}
                  alt="גן האירועים"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(61,56,50,0.35) 0%, transparent 50%)",
                }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Navigation buttons */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 px-6 mb-12">
              <a
                href={WAZE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-sm tracking-wide transition-all duration-300 hover:shadow-md min-w-[180px] justify-center"
                style={{ backgroundColor: "#9C8465", color: "#FDFCF8" }}
              >
                <Navigation size={16} />
                ניווט ב-Waze
              </a>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-sans text-sm tracking-wide transition-all duration-300 hover:shadow-md border min-w-[180px] justify-center"
                style={{ borderColor: "#E6E0D4", color: "#3D3832" }}
              >
                <MapPin size={16} />
                Google Maps
              </a>
            </div>
          </ScrollReveal>

          <div className="mx-8 h-px mb-10" style={{ backgroundColor: "#D6CFBF" }} />

          {/* QUOTE */}
          <div className="text-center px-8 pt-4 pb-16">
            <ScrollReveal>
              <p
                className="font-serif italic text-lg font-light leading-relaxed"
                style={{ color: "#9C8465" }}
              >
                ״כי מצאתי את שאהבה נפשי״
              </p>
              <p
                className="font-sans text-xs mt-2 tracking-wider"
                style={{ color: "#3D3832", opacity: 0.35 }}
              >
                שיר השירים ג׳, ד׳
              </p>
            </ScrollReveal>
          </div>

        </motion.div>
      )}
    </>
  );
}
