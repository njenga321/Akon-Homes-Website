import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronDown } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import CTASection from "@/components/CTASection";
import { properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import { stats } from "@/data/stats";

const featured = properties.filter((p) => p.status === "Now Selling").slice(0, 3);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=90&auto=format&fit=crop"
            alt="Akon Homes — luxury residential development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xs tracking-[0.35em] uppercase text-primary mb-8 font-medium"
          >
            Established 2012 — Nigeria & Beyond
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground leading-[0.92] mb-8"
          >
            Crafting
            <br />
            <span className="text-primary italic">Legacy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Bespoke residential and mixed-use developments in the world's most compelling cities. Built for those who demand the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/developments" data-testid="link-view-collection">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
                View Collection
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact" data-testid="link-book-visit-hero">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300">
                Book Site Visit
              </button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-24 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Featured Developments */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionTitle
              eyebrow="Our Portfolio"
              title={"Featured\nDevelopments"}
              subtitle="A curated selection of our most distinguished current offerings."
            />
            <Link href="/developments" data-testid="link-all-developments">
              <button className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors shrink-0">
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* About Strip */}
      <section className="py-32 bg-card/40 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
              Our Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-8">
              We build homes that endure for generations.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Akon Homes, we believe that exceptional architecture is not merely about aesthetics — it is about permanence. Every development we undertake is conceived with a single question in mind: will this building matter in fifty years?
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Our answer to that question shapes every decision: the selection of materials, the quality of craftsmanship, the calibre of partners we choose to collaborate with. We do not build to the market. We build to a standard.
            </p>
            <Link href="/about" data-testid="link-learn-more">
              <button className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                Learn our story
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85&auto=format&fit=crop"
                alt="Akon Homes craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 rounded-2xl bg-card border border-white/[0.08] px-6 py-5 backdrop-blur-sm"
              style={{ background: "rgba(22, 31, 44, 0.9)" }}
            >
              <p className="font-serif text-3xl text-primary mb-1">12+</p>
              <p className="text-muted-foreground text-sm">Years of excellence in luxury development</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <SectionTitle
              eyebrow="Client Stories"
              title="What Our Residents Say"
              subtitle="The highest measure of our success is the satisfaction of the people who call our homes theirs."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        eyebrow="Begin Your Journey"
        title={"Find Your\nPerfect Home"}
        subtitle="Our sales advisors are ready to guide you through our current collection and help you find the residence that matches your vision."
        primaryLabel="Explore Developments"
        primaryHref="/developments"
        secondaryLabel="Speak with an Advisor"
        secondaryHref="/contact"
      />
    </div>
  );
}
