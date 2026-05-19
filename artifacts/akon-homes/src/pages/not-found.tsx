import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Home, Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden" data-testid="not-found-page">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,164,107,0.07) 0%, transparent 70%)" }} className="absolute inset-0" />
        {/* Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
          <defs>
            <pattern id="nf-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C8A46B" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nf-grid)" />
        </svg>
      </div>

      <div className="relative text-center px-6 max-w-2xl">
        {/* Large 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8"
        >
          <p className="font-serif text-[160px] md:text-[200px] leading-none text-primary/[0.07] select-none">
            404
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Layers className="w-8 h-8 text-primary" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-5 font-medium">Page Not Found</p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            This address doesn't exist<br />
            <span className="text-primary italic">in our portfolio</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-md mx-auto">
            The page you are looking for may have moved, or the address may be incorrect. Let us guide you back to something beautiful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" data-testid="link-go-home">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
                <Home className="w-4 h-4" />
                Return Home
              </button>
            </Link>
            <Link href="/developments" data-testid="link-view-developments">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300">
                <ArrowLeft className="w-4 h-4" />
                View Developments
              </button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16 flex flex-wrap gap-3 justify-center">
            {[
              { href: "/about", label: "About Us" },
              { href: "/blog", label: "Journal" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <span className="px-4 py-2 rounded-full bg-card border border-white/[0.08] text-muted-foreground text-sm hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-pointer">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
