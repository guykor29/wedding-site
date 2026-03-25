import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "../components/wedding/ScrollReveal";

const COUPLE_IMAGE = "https://media.base44.com/images/public/69c037db1c1fd8961ebfde91/23aee655b_generated_2b3fdf97.png";

export default function Story() {
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
          קצת עלינו
        </motion.p>
        <motion.h1
          className="font-serif text-4xl md:text-6xl font-light"
          style={{ color: "#3D3832" }}
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          הסיפור שלנו
        </motion.h1>
        <motion.div
          className="w-12 h-px mx-auto mt-6"
          style={{ backgroundColor: "#9C8465" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
      </section>

      {/* Story content */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-sm aspect-[4/5]">
              <img
                src={COUPLE_IMAGE}
                alt="שני וגיא - תמונת זוג רומנטית"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* Text */}
          <div>
            <ScrollReveal delay={0.2}>
              <h2
                  className="font-serif text-2xl md:text-3xl font-light mb-6"
                  style={{ color: "#3D3832" }}
                >
                  שני & גיא
                </h2>
              </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p
                className="font-sans text-base font-light leading-[1.9] mb-6"
                style={{ color: "#3D3832", opacity: 0.7 }}
              >
                נפגשנו ביום חורפי אחד, כשלא ציפינו לזה בכלל.
                מבט אחד, חיוך אחד, ושיחה שנמשכה שעות — וידענו שמשהו מיוחד קורה.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p
                className="font-sans text-base font-light leading-[1.9] mb-6"
                style={{ color: "#3D3832", opacity: 0.7 }}
              >
                מאז, כל יום הפך להרפתקה חדשה.
                צחוק בלתי פוסק, טיולים ספונטניים, שיחות עד הלילות המאוחרים,
                ואהבה שגדלה עם כל רגע שעובר.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p
                className="font-sans text-base font-light leading-[1.9]"
                style={{ color: "#3D3832", opacity: 0.7 }}
              >
                עכשיו, אנחנו מוכנים לצעד הבא — לבנות בית, לבנות חיים,
                ולחגוג את האהבה שלנו עם כל האנשים שהכי חשובים לנו.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline milestones */}
      <section className="max-w-xl mx-auto px-6 py-20 md:py-28">
        <div className="space-y-12">
          {[
            { date: "25.01.2022", text: "״שלום הגעתי לשידוך שלי?״" },
            { date: "31.01.2022", text: "נהיינו ביחד" },
            { date: "07.09.2022", text: "טיסה ראשונה ביחד — רומא" },
            { date: "25.01.2025", text: "עברנו לגור ביחד" },
            { date: "19.04.2025", text: "ההצעה" },
            { date: "17.05.2026", text: "חתונה ✦" },
          ].map((milestone, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-center gap-6">
                <p
                  className="font-serif text-sm md:text-base font-light flex-shrink-0 w-24 text-left"
                  style={{ color: "#9C8465" }}
                >
                  {milestone.date}
                </p>
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "#E6E0D4" }}
                />
                <p
                  className="font-sans text-sm font-light"
                  style={{ color: "#3D3832", opacity: 0.65 }}
                >
                  {milestone.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="text-center px-6 pb-8">
        <ScrollReveal>
          <p
            className="font-serif text-xl md:text-2xl font-light italic leading-relaxed"
            style={{ color: "#9C8465" }}
          >
            ״הסיפור הכי יפה שלנו — רק מתחיל״
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
