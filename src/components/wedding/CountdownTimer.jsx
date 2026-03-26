import React, { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-05-17T19:30:00");

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
    <div className="text-center">
      <h2
        className="font-serif text-2xl md:text-3xl font-bold tracking-[0.2em] uppercase mb-2"
        style={{ color: "#1A1714" }}
      >
        COUNTDOWN
      </h2>
      <p
        className="font-sans text-sm mb-1"
        style={{ color: "#3D3832", opacity: 0.6 }}
      >
        to the big day
      </p>
      <div
        className="w-12 h-px mx-auto mb-6"
        style={{ backgroundColor: "#8B7355" }}
      />
      <div className="flex items-start gap-4 md:gap-6">
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <div
              className="flex items-center justify-center rounded-xl mb-2"
              style={{
                backgroundColor: "#E8E0D2",
                width: "clamp(70px, 18vw, 100px)",
                height: "clamp(70px, 18vw, 100px)",
              }}
            >
              <p
                className="font-serif text-3xl md:text-5xl font-bold leading-none"
                style={{ color: "#3D3832" }}
              >
                {String(unit.value).padStart(2, "0")}
              </p>
            </div>
            <p
              className="font-sans text-xs tracking-wide"
              style={{ color: "#3D3832", opacity: 0.6 }}
            >
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
