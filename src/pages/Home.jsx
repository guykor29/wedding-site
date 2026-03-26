import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";
import EnvelopeReveal from "../components/wedding/EnvelopeReveal";
import CountdownTimer from "../components/wedding/CountdownTimer";
import ScrollReveal from "../components/wedding/ScrollReveal";

const HERO_IMAGE = "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/b3fb92277_generated_f8163fbf.png";
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
          style={{ backgroundColor: "#F5F0E8", minHeight: "100vh" }}
        >

          {/* HERO */}
          <div ref={heroRef}>
            <ScrollReveal delay={0.1}>
              <div className="relative pt-16" style={{ marginBottom: "7rem" }}>
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
                    background: "linear-gradient(to bottom, #F5F0E8 0%, transparent 100%)",
                  }} />
                  <div className="absolute bottom-0 left-0 right-0" style={{
                    height: "45%",
                    background: "linear-gradient(to bottom, transparent 0%, #F5F0E8 100%)",
                  }} />
                </div>

                <div className="absolute left-0 right-0 flex flex-col items-center" style={{ bottom: 0, transform: "translateY(50%)" }}>
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
                    className="font-serif text-5xl font-normal tracking-wider text-center mt-3"
                    style={{ color: "#1A1714" }}
                    {...staggerItem(0.15)}
                  >
                    Shani & Guy
                  </motion.p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* WEDDING DAY */}
          <ScrollReveal>
            <div className="text-center px-6 mb-10">
              <h2
                className="font-serif text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-4"
                style={{ color: "#1A1714" }}
              >
                WEDDING DAY
              </h2>
              <div
                className="w-16 h-px mx-auto mb-4"
                style={{ backgroundColor: "#8B7355" }}
              />
              <p
                className="font-sans text-lg tracking-[0.15em] mb-2"
                style={{ color: "#3D3832" }}
              >
                17.05.2026
              </p>
              <p
                className="font-sans text-base"
                style={{ color: "#3D3832", opacity: 0.7 }}
              >
                19:30 | יום ראשון
              </p>
            </div>
          </ScrollReveal>

          <div className="mx-8 h-px mb-10" style={{ backgroundColor: "#C9C0AD" }} />

          {/* COUNTDOWN */}
          <ScrollReveal>
            <div className="flex justify-center px-6 mb-10">
              <CountdownTimer />
            </div>
          </ScrollReveal>

          <div className="mx-8 h-px mb-10" style={{ backgroundColor: "#C9C0AD" }} />

          {/* LOCATION */}
          <ScrollReveal>
            <div className="text-center px-8 mb-8">
              <h2
                className="font-serif text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-3"
                style={{ color: "#1A1714" }}
              >
                LOCATION
              </h2>
              <div
                className="w-12 h-px mx-auto mb-6"
                style={{ backgroundColor: "#8B7355" }}
              />
              <p
                className="font-sans text-base mb-1"
                style={{ color: "#3D3832" }}
              >
                אולם ״תרין״, ראשון לציון.
              </p>
              <p
                className="font-sans text-base mb-6"
                style={{ color: "#3D3832", opacity: 0.6 }}
              >
                כתובת: אליעזר מזל 6
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={WAZE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans text-sm tracking-wide border transition-all duration-300 hover:shadow-md min-w-[200px] justify-center"
                  style={{ borderColor: "#8B7355", color: "#3D3832" }}
                >
                  <Navigation size={16} />
                  ניווט באמצעות Waze
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans text-sm tracking-wide border transition-all duration-300 hover:shadow-md min-w-[200px] justify-center"
                  style={{ borderColor: "#8B7355", color: "#3D3832" }}
                >
                  <MapPin size={16} />
                  ניווט באמצעות Google Maps
                </a>
              </div>
            </div>
          </ScrollReveal>


        </motion.div>
      )}
    </>
  );
}
