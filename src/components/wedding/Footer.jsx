import React from "react";

export default function Footer() {
  return (
    <footer className="py-16 text-center" style={{ backgroundColor: "#FAF8F4" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="w-px h-12 mx-auto mb-8" style={{ backgroundColor: "#E6E0D4" }} />

        <img
          src="/logo.png"
          alt="לוגו שני וגיא"
          className="h-12 w-auto mx-auto mb-3 opacity-40"
        />
        <p
          className="font-sans text-xs tracking-[0.25em] uppercase"
          style={{ color: "#9C8465", opacity: 0.35 }}
        >
          שני & גיא · 2026
        </p>
      </div>
    </footer>
  );
}
