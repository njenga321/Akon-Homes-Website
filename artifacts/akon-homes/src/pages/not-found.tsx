import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,164,107,0.08) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center px-6 max-w-lg"
        data-testid="not-found-page"
      >
        <p className="font-serif text-[140px] md:text-[180px] leading-none text-primary/10 select-none mb-4">
          404
        </p>
        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 -mt-12">
          Page Not Found
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-10">
          The page you are looking for may have moved, or the address may be incorrect. Let us help you find what you are looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" data-testid="link-go-home">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300">
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </button>
          </Link>
          <Link href="/developments" data-testid="link-view-developments">
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300">
              View Developments
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
