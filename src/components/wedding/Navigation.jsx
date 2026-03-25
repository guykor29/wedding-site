import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "ראשי", path: "/" },
  { label: "ההצעה", path: "/proposal" },
  { label: "הסיפור שלנו", path: "/story" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div
          className={`transition-all duration-500 ${
            isScrolled
              ? "backdrop-blur-md shadow-[0_1px_0_0_hsl(35,20%,88%)]"
              : "bg-transparent"
          }`}
          style={isScrolled ? { backgroundColor: "rgba(253,252,248,0.9)" } : {}}
        >
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="לוגו שני וגיא"
                className="h-9 w-auto opacity-80"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-sans tracking-wide transition-colors duration-300 hover:opacity-100 ${
                    location.pathname === item.path
                      ? "opacity-100"
                      : "opacity-60"
                  }`}
                  style={{ color: "#3D3832" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 -ml-2"
              style={{ color: "#3D3832" }}
              aria-label="תפריט ניווט"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 backdrop-blur-lg" style={{ backgroundColor: "rgba(253,252,248,0.98)" }} />
            <nav className="relative flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    to={item.path}
                    className={`font-serif text-2xl tracking-wide transition-colors ${
                      location.pathname === item.path ? "opacity-100" : "opacity-50"
                    }`}
                    style={{ color: "#3D3832" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
