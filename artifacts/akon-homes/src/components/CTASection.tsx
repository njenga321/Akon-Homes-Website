import { motion } from "framer-motion";
import { Link } from "wouter";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="py-32 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,164,107,0.12) 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-4xl mx-auto px-6 text-center"
      >
        {eyebrow && (
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryHref} data-testid="button-cta-primary">
            <button className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
              {primaryLabel}
            </button>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref} data-testid="button-cta-secondary">
              <button className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300">
                {secondaryLabel}
              </button>
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
