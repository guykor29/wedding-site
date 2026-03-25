import React, { useState, useEffect } from "react";

const WEDDING_DATE = new Date("2026-05-17T18:00:00");

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
    <div className="flex items-center gap-6 md:gap-10">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-6 md:gap-10">
          <div className="text-center">
            <p
              className="font-serif text-3xl md:text-5xl font-light leading-none mb-1"
              style={{ color: "#3D3832" }}
            >
              {String(unit.value).padStart(2, "0")}
            </p>
            <p
              className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase"
              style={{ color: "#9C8465" }}
            >
              {unit.label}
            </p>
          </div>
          {i < units.length - 1 && (
            <span
              className="font-serif text-2xl md:text-3xl font-light opacity-20"
              style={{ color: "#9C8465" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
