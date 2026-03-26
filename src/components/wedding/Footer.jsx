import React from "react";

export default function Footer() {
  return (
    <footer className="py-8 text-center" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="max-w-4xl mx-auto px-6">
        <img
          src="/logo.png"
          alt="לוגו שני וגיא"
          className="h-12 w-auto mx-auto mb-3"
        />
        <p
          className="font-sans text-xs tracking-[0.25em] uppercase"
          style={{ color: "#3D3832", opacity: 0.6 }}
        >
          שני & גיא · 2026
        </p>
      </div>
    </footer>
  );
}
