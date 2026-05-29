import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Leaf,
  Clock,
  Gem,
  MessageCircle,
  Phone,
  Mail,
  CheckCircle2,
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import TestimonialCard from "@/components/TestimonialCard";
import AnimatedCounter from "@/components/AnimatedCounter";
import InquiryForm from "@/components/InquiryForm";
import { properties } from "@/data/properties";
import { testimonials } from "@/data/testimonials";
import { stats } from "@/data/stats";

// ── Section filter tabs for featured developments ──────────────────────────
type DevFilter = "All" | "Now Selling" | "Under Construction" | "Coming Soon";
const devFilters: DevFilter[] = ["All", "Now Selling", "Under Construction", "Coming Soon"];

// ── Construction progress data ─────────────────────────────────────────────
const progressUpdates = [
  {
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop",
    title: "The Meridian — Floors 18–24",
    location: "Lagos Island",
    percent: 74,
    update: "Structural frame complete to level 24. External glazing underway on lower floors. Interior fit-out commencing Q3.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&q=80&auto=format&fit=crop",
    title: "Waterfront Collection — Phase 2",
    location: "Port Harcourt",
    percent: 42,
    update: "Foundation works complete. Podium level concrete pours ongoing. Facade engineering tender awarded.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80&auto=format&fit=crop",
    title: "Parkview Heights — Block B",
    location: "Abuja",
    percent: 91,
    update: "Practical completion targeted Q4 2025. Snag list inspections in progress. Landscaping and external works finalising.",
  },
];

// ── Why Akon Homes value cards ─────────────────────────────────────────────
const whyCards = [
  {
    icon: MapPin,
    title: "Prime Locations",
    body: "Every site is selected for its strategic position — connectivity, capital growth potential, and the quality of the immediate environment.",
  },
  {
    icon: Leaf,
    title: "Sustainable Design",
    body: "Passive design, renewable energy integration, and responsible materials sourcing embedded from day one of every project brief.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    body: "A twelve-year track record of on-programme completion, backed by transparent reporting and proactive programme management.",
  },
  {
    icon: Gem,
    title: "Premium Finishes",
    body: "Handpicked materials from world-leading suppliers. Craftsmanship that rewards close inspection. Interiors that improve with time.",
  },
];

// ── Progress bar component ─────────────────────────────────────────────────
function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="h-full rounded-full bg-primary"
      />
    </div>
  );
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<DevFilter>("All");

  const filtered =
    activeFilter === "All"
      ? properties.slice(0, 6)
      : properties.filter((p) => p.status === activeFilter).slice(0, 6);

  return (
    <div>
      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90&auto=format&fit=crop"
            alt="Akon Homes luxury development"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-xs tracking-[0.35em] uppercase text-primary mb-8 font-medium"
          >
            Established 2010 — Nigeria & Beyond
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl lg:text-[7rem] text-foreground leading-[0.9] mb-6"
          >
            Redefining Modern
            <br />
            <span className="text-primary italic">Urban Living</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Bespoke residential developments crafted for discerning homeowners and investors who demand world-class quality in the world's most dynamic cities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/developments" data-testid="link-explore-hero">
              <button className="cursor-pointer inline-flex items-center gap-2 px-9 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
                Explore Developments
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact" data-testid="link-schedule-hero">
              <button className="cursor-pointer inline-flex items-center gap-2 px-9 py-4 rounded-full border border-white/25 text-foreground font-medium text-sm tracking-wide hover:border-primary/60 hover:text-primary transition-all duration-300 backdrop-blur-sm">
                Schedule a Visit
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. TRUST STATISTICS ───────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* ── 3. FEATURED DEVELOPMENTS ─────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium"
              >
                Our Portfolio
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl text-foreground leading-tight"
              >
                Featured Developments
              </motion.h2>
            </div>
            <Link href="/developments" data-testid="link-all-developments">
              <button className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors shrink-0">
                View Full Portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-2 mb-10"
            data-testid="filter-homepage"
          >
            {devFilters.map((f) => (
              <button
                key={f}
                data-testid={`filter-home-${f}`}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === f
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-card/60 border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-20">No developments in this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <PropertyCard key={p.id} property={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. WHY AKON HOMES ────────────────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium"
            >
              Our Difference
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-foreground leading-tight"
            >
              Why Choose Akon Homes
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-3xl bg-background border border-white/[0.08] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
                  data-testid={`card-why-${i}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary/20">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. LIFESTYLE SECTION ──────────────────────────────────────────── */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
                The Akon Standard
              </p>
              <h2 className="font-serif text-5xl md:text-6xl text-foreground leading-[0.95] mb-8">
                A life defined
                <br />
                by{" "}
                <span className="text-primary italic">beauty</span>
                <br />
                and intention.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                Our homes are not simply places to live. They are environments carefully engineered to elevate every aspect of your daily experience — from the quality of morning light through floor-to-ceiling glazing, to the hush of a well-insulated bedroom at night.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Architecture that rewards sustained attention. Interiors that improve with time. Communities that give residents genuine pride of place. This is the standard we hold ourselves to on every development, in every city.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {[
                  "Award-winning architecture",
                  "International materials",
                  "Smart home systems",
                  "Curated art programmes",
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {feat}
                  </div>
                ))}
              </div>
              <Link href="/about">
                <button className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                  Discover our philosophy
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </motion.div>

            {/* Image collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85&auto=format&fit=crop"
                  alt="Luxury interior living"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating accent image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="absolute -bottom-8 -left-8 w-48 h-48 rounded-2xl overflow-hidden border-4 border-background shadow-2xl hidden md:block"
              >
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=85&auto=format&fit=crop"
                  alt="Premium finishes"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Badge overlay */}
              <div
                className="absolute top-8 -right-4 rounded-2xl px-5 py-4 border border-white/[0.08] backdrop-blur-xl hidden md:block"
                style={{ background: "rgba(15,23,32,0.85)" }}
              >
                <p className="font-serif text-3xl text-primary mb-0.5">850+</p>
                <p className="text-muted-foreground text-xs">Homes Delivered</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 6. CONSTRUCTION PROGRESS ─────────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium"
              >
                Live Updates
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl text-foreground leading-tight"
              >
                Construction Progress
              </motion.h2>
            </div>
            <Link href="/developments" data-testid="link-all-progress">
              <button className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors shrink-0">
                All Developments
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {progressUpdates.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-3xl overflow-hidden bg-background border border-white/[0.08] transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/40"
                data-testid={`card-progress-${i}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white text-xs font-medium">{item.percent}% Complete</span>
                    </div>
                    <ProgressBar percent={item.percent} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg text-foreground mb-1">{item.title}</h3>
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
                    <MapPin className="w-3 h-3 text-primary" />
                    {item.location}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.update}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TESTIMONIALS ───────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium"
            >
              Client Stories
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-xl"
            >
              Words from Our Residents
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. INVESTMENT CTA ─────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&auto=format&fit=crop"
            alt="Investment opportunity"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium"
            >
              Investment Opportunity
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl md:text-6xl text-foreground leading-tight mb-6"
            >
              Invest in Africa's most dynamic real estate market.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-4 leading-relaxed"
            >
              Competitive rental yields. Capital growth in high-demand corridors. Flexible payment structures designed for diaspora and international buyers.
            </motion.p>
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-2 mb-10"
            >
              {[
                "Instalment payment plans up to 48 months",
                "Mortgage financing partnerships available",
                "Off-plan pricing with guaranteed buyback options",
                "Dollar-denominated transactions accepted",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/developments" data-testid="button-investment-explore">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  Explore Investment Options
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/contact" data-testid="button-investment-speak">
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300">
                  Speak with an Advisor
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT CTA ────────────────────────────────────────────────── */}
      <section className="py-32 border-t border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Info + WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
                Ready to Begin?
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Let's find your perfect home.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                Whether you are a first-time buyer, an experienced investor, or a member of the diaspora returning home — our advisory team is ready to guide you, at your pace and on your terms.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { icon: Phone, label: "Lagos Office", value: "+234 (0) 1 700 8800" },
                  { icon: Phone, label: "London Office", value: "+44 (0) 20 7123 4567" },
                  { icon: Mail, label: "Email", value: "info@akonhomes.com" },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{label}</p>
                      <p className="text-foreground">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/2341700880"
                target="_blank"
                rel="noreferrer"
                data-testid="link-whatsapp"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-emerald-600/40 bg-emerald-900/20 text-emerald-300 text-sm font-medium hover:bg-emerald-900/40 hover:border-emerald-500/60 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with us on WhatsApp
              </a>
            </motion.div>

            {/* Right: Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <InquiryForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
