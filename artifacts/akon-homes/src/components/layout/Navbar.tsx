import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@assets/image_1780063580360.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/developments", label: "Developments" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-white/[0.06] py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="link-logo">
            <span className="flex items-center gap-3 cursor-pointer group">
              <img
                src={logoSrc}
                alt="Akon Homes logo"
                className="h-10 w-10 object-contain shrink-0"
                style={{ mixBlendMode: "screen" }}
              />
              <span className="font-serif text-xl md:text-2xl tracking-[0.2em] text-primary group-hover:text-accent transition-colors duration-300">
                AKON HOMES
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase()}`}>
                <span
                  className={`text-sm tracking-wide cursor-pointer transition-colors duration-300 relative group ${
                    isActive(href) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                      isActive(href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/contact" data-testid="link-book-visit-nav">
              <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                Book Site Visit
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-full bg-card/60 border border-white/[0.08] flex items-center justify-center text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/[0.06] pt-24 pb-10 px-6 lg:hidden"
            data-testid="mobile-menu"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href}>
                  <span
                    className={`block py-4 text-xl font-serif border-b border-white/[0.06] cursor-pointer transition-colors duration-300 ${
                      isActive(href) ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              ))}
              <div className="pt-6">
                <Link href="/contact">
                  <button className="w-full py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300">
                    Book Site Visit
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
