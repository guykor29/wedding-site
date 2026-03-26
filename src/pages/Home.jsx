import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navigation, MapPin } from "lucide-react";
import EnvelopeReveal from "../components/wedding/EnvelopeReveal";
import CountdownTimer from "../components/wedding/CountdownTimer";

const HERO_IMAGE = "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/b3fb92277_generated_f8163fbf.png";
const LOGO_URL = "/logo.png";

const WAZE_URL = "https://waze.com/ul?q=אליעזר+מזל+6+ראשון+לציון&navigate=yes";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Eliezer+Mazal+6+Rishon+LeZion";

const EASE = [0.25, 0.46, 0.45, 0.94];

// Stagger container + children pattern
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE },
  },
};

const lineGrow = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1, opacity: 1,
    transition: { duration: 1.2, ease: EASE },
  },
};

// Animated heading that reveals letter by letter
function AnimatedHeading({ text, className, style, as: Tag = "h2" }) {
  const letters = text.split("");
  return (
    <Tag className={className} style={{ ...style, direction: "ltr", unicodeBidi: "isolate" }}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1, y: 0,
              transition: { duration: 0.5, delay: i * 0.04, ease: EASE },
            },
          }}
          style={{ display: "inline-block", minWidth: letter === " " ? "0.3em" : undefined }}
        >
          {letter}
        </motion.span>
      ))}
    </Tag>
  );
}

// Divider line that grows from center
function AnimatedDivider({ width = "w-16", className = "mb-4" }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <motion.div
        className={`${width} h-px`}
        style={{ backgroundColor: "#8B7355", transformOrigin: "center" }}
        variants={lineGrow}
      />
    </div>
  );
}

// Section wrapper with stagger
function StaggerSection({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {children}
    </motion.div>
  );
}

// Golden glow button style
const buttonStyle = {
  borderColor: "#8B7355",
  color: "#3D3832",
  background: "linear-gradient(135deg, rgba(139,115,85,0.06) 0%, rgba(139,115,85,0.02) 100%)",
};

export default function Home() {
  const [sealOpen, setSealOpen] = useState(false);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.88]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.6]);

  return (
    <>
      {!sealOpen && <EnvelopeReveal onReveal={() => setSealOpen(true)} />}

      <div style={{ backgroundColor: "#F5F0E8", minHeight: "100vh", scrollBehavior: "smooth" }}>

        {/* HERO */}
        <div ref={heroRef}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
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
                    scale: heroImageScale,
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
                {/* Logo with glow + slow pulse */}
                <div className="relative">
                  {/* Glow behind logo */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      inset: -12,
                      background: "radial-gradient(circle, rgba(139,115,85,0.25) 0%, rgba(139,115,85,0.08) 50%, transparent 70%)",
                      filter: "blur(8px)",
                    }}
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.img
                    src={LOGO_URL}
                    alt="לוגו שני וגיא"
                    className="relative w-20 h-20 object-contain"
                    style={{
                      filter: "drop-shadow(0 2px 12px rgba(139,115,85,0.3))",
                      scale: logoScale,
                      opacity: logoOpacity,
                      willChange: "transform",
                    }}
                  />
                </div>
                <motion.p
                  className="font-serif text-5xl font-normal tracking-wider text-center mt-3"
                  style={{ color: "#1A1714" }}
                  initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                >
                  Shani & Guy
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* WEDDING DAY */}
        <StaggerSection className="text-center px-6 mb-10">
          <AnimatedHeading
            text="WEDDING DAY"
            className="font-serif text-2xl md:text-3xl font-bold tracking-[0.3em] uppercase mb-4"
            style={{ color: "#1A1714" }}
          />
          <AnimatedDivider />
          <motion.p
            className="font-sans text-lg tracking-[0.15em] mb-2"
            style={{ color: "#3D3832" }}
            variants={fadeUp}
          >
            17.05.2026
          </motion.p>
          <motion.p
            className="font-sans text-base"
            style={{ color: "#3D3832", opacity: 0.7 }}
            variants={fadeUp}
          >
            19:30 | יום ראשון
          </motion.p>
        </StaggerSection>

        {/* DIVIDER */}
        <motion.div
          className="mx-8 h-px mb-10"
          style={{ backgroundColor: "#C9C0AD", transformOrigin: "center" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.4, ease: EASE }}
        />

        {/* COUNTDOWN */}
        <StaggerSection className="flex justify-center px-6 mb-10">
          <CountdownTimer />
        </StaggerSection>

        {/* DIVIDER */}
        <motion.div
          className="mx-8 h-px mb-10"
          style={{ backgroundColor: "#C9C0AD", transformOrigin: "center" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 1.4, ease: EASE }}
        />

        {/* LOCATION */}
        <StaggerSection className="text-center px-8 mb-8">
          <AnimatedHeading
            text="LOCATION"
            className="font-serif text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-3"
            style={{ color: "#1A1714" }}
          />
          <AnimatedDivider width="w-12" className="mb-6" />
          <motion.p
            className="font-sans text-base mb-1"
            style={{ color: "#3D3832" }}
            variants={fadeUp}
          >
            אולם ״תרין״, ראשון לציון.
          </motion.p>
          <motion.p
            className="font-sans text-base mb-6"
            style={{ color: "#3D3832", opacity: 0.6 }}
            variants={fadeUp}
          >
            כתובת: אליעזר מזל 6
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            variants={staggerContainer}
          >
            <motion.a
              href={WAZE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans text-sm tracking-wide border min-w-[200px] justify-center"
              style={buttonStyle}
              variants={{
                hidden: { opacity: 0, x: 30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(139,115,85,0.3), 0 4px 12px rgba(139,115,85,0.15)",
                borderColor: "#A08960",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <Navigation size={16} />
              ניווט באמצעות Waze
            </motion.a>
            <motion.a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-sans text-sm tracking-wide border min-w-[200px] justify-center"
              style={buttonStyle}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(139,115,85,0.3), 0 4px 12px rgba(139,115,85,0.15)",
                borderColor: "#A08960",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <MapPin size={16} />
              ניווט באמצעות Google Maps
            </motion.a>
          </motion.div>
        </StaggerSection>

      </div>
    </>
  );
}
