import { useState, useCallback, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Home,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Waves,
  Shield,
  Building2,
  Zap,
  Dumbbell,
  Trees,
  Check,
  ChevronDown,
  Phone,
  MessageCircle,
  Calendar,
  Layers,
  TrendingUp,
  Clock,
  Car,
  Plane,
  BookOpen,
  Utensils,
  Star,
} from "lucide-react";
import InquiryForm from "@/components/InquiryForm";
import { properties } from "@/data/properties";
import { getPropertyExtras } from "@/data/propertyExtras";

// ── Status colour map ─────────────────────────────────────────────────────
const statusColors: Record<string, string> = {
  "Now Selling": "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
  "Coming Soon": "bg-amber-900/60 text-amber-300 border-amber-700/40",
  "Sold Out": "bg-zinc-800/60 text-zinc-400 border-zinc-600/40",
  "Under Construction": "bg-blue-900/60 text-blue-300 border-blue-700/40",
};

// ── Amenity definitions ───────────────────────────────────────────────────
const amenities = [
  { icon: Waves, label: "Infinity Pool", desc: "Panoramic rooftop pool with city vistas" },
  { icon: Shield, label: "Smart Security", desc: "24/7 biometric access and CCTV monitoring" },
  { icon: Building2, label: "Rooftop Lounge", desc: "Private residents' sky terrace and bar" },
  { icon: Zap, label: "Backup Power", desc: "Full development generator coverage" },
  { icon: Dumbbell, label: "Private Gym", desc: "State-of-the-art fitness and wellness suite" },
  { icon: Trees, label: "Landscaped Gardens", desc: "Curated communal grounds by award-winning studio" },
];

// ── Category icon map for landmarks ──────────────────────────────────────
const catIcon: Record<string, typeof MapPin> = {
  Business: TrendingUp,
  Leisure: Star,
  Hospitality: Utensils,
  Development: Building2,
  Transport: Plane,
  Education: BookOpen,
  Retail: TrendingUp,
};

// ── Animated count-up (inline) ────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ── SVG Floor Plan renderer ────────────────────────────────────────────────
function FloorPlanSVG({ rooms }: { rooms: { name: string; w: number; h: number; x: number; y: number }[] }) {
  const maxX = Math.max(...rooms.map((r) => r.x + r.w));
  const maxY = Math.max(...rooms.map((r) => r.y + r.h));
  return (
    <svg
      viewBox={`-8 -8 ${maxX + 16} ${maxY + 16}`}
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {rooms.map((room, i) => (
        <g key={i}>
          <rect
            x={room.x + 2}
            y={room.y + 2}
            width={room.w - 4}
            height={room.h - 4}
            rx="4"
            fill="rgba(200,164,107,0.08)"
            stroke="rgba(200,164,107,0.4)"
            strokeWidth="1"
          />
          <text
            x={room.x + room.w / 2}
            y={room.y + room.h / 2 - 4}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(200,164,107,0.9)"
            fontSize="10"
            fontFamily="'Playfair Display', serif"
          >
            {room.name}
          </text>
          <text
            x={room.x + room.w / 2}
            y={room.y + room.h / 2 + 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="rgba(168,176,188,0.6)"
            fontSize="8"
          >
            {room.w * room.h > 8000 ? `${Math.round((room.w * room.h) / 900)} m²` : ""}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── FAQ item ──────────────────────────────────────────────────────────────
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-white/[0.06]"
      data-testid={`faq-item-${index}`}
    >
      <button
        className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
          {q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground leading-relaxed pb-6 text-sm">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function DevelopmentDetail() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);
  const related = properties.filter((p) => p.id !== id).slice(0, 3);

  // Gallery hero carousel
  const [heroRef, heroApi] = useEmblaCarousel({ loop: true });
  const [heroIndex, setHeroIndex] = useState(0);
  const prevHero = useCallback(() => heroApi?.scrollPrev(), [heroApi]);
  const nextHero = useCallback(() => heroApi?.scrollNext(), [heroApi]);

  useEffect(() => {
    if (!heroApi) return;
    heroApi.on("select", () => setHeroIndex(heroApi.selectedScrollSnap()));
  }, [heroApi]);

  // Floor plans
  const [activePlan, setActivePlan] = useState(0);
  const [planZoom, setPlanZoom] = useState(false);

  // Gallery lightbox
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Extras data
  const extras = property ? getPropertyExtras(property.id) : null;

  if (!property || !extras) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl text-foreground mb-4">Development Not Found</h1>
        <Link href="/developments">
          <button className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Developments
          </button>
        </Link>
      </div>
    );
  }

  // Build extended image list for gallery section
  const galleryImages = [
    ...property.images,
    "https://images.unsplash.com/photo-1600210491892-03d54c37f5c8?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=900&q=85&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85&auto=format&fit=crop",
  ];

  return (
    <div>
      {/* ── 1. FULLSCREEN HERO GALLERY ─────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden" data-testid="hero-gallery">
        {/* Embla */}
        <div className="overflow-hidden absolute inset-0" ref={heroRef}>
          <div className="flex h-full">
            {property.images.map((src, i) => (
              <div key={i} className="relative flex-none w-full h-full">
                <motion.img
                  src={src}
                  alt={`${property.name} — ${i + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: heroIndex === i ? 1 : 1.05 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent pointer-events-none" />

        {/* Back nav */}
        <div className="absolute top-8 left-6 z-20 pt-20">
          <Link href="/developments" data-testid="link-back">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/[0.12] text-white/80 hover:text-primary text-sm transition-colors">
              <ArrowLeft className="w-4 h-4" />
              All Developments
            </button>
          </Link>
        </div>

        {/* Hero arrow controls */}
        <button
          onClick={prevHero}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/[0.12] flex items-center justify-center text-white hover:text-primary hover:border-primary/40 transition-all duration-300"
          data-testid="hero-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm border border-white/[0.12] flex items-center justify-center text-white hover:text-primary hover:border-primary/40 transition-all duration-300"
          data-testid="hero-next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Floating project info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-28 left-6 md:left-12 z-20 max-w-xl"
        >
          <span className={`inline-block text-xs tracking-wide px-3 py-1.5 rounded-full border backdrop-blur-sm mb-4 ${statusColors[property.status]}`}>
            {property.status}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] mb-3 drop-shadow-2xl">
            {property.name}
          </h1>
          <div className="flex items-center gap-1.5 text-white/70 mb-5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{property.location}</span>
          </div>
          <div className="flex gap-3">
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/30">
                Register Interest
              </button>
            </Link>
            <button
              onClick={() => document.getElementById("floor-plans")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.15] text-white text-sm hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              View Plans
            </button>
          </div>
        </motion.div>

        {/* Thumbnail strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="absolute bottom-6 left-6 md:left-12 z-20 flex gap-2"
          data-testid="hero-thumbnails"
        >
          {property.images.map((src, i) => (
            <button
              key={i}
              onClick={() => heroApi?.scrollTo(i)}
              className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === heroIndex ? "border-primary opacity-100 scale-105" : "border-transparent opacity-50 hover:opacity-75"}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </motion.div>

        {/* Slide counter */}
        <div className="absolute bottom-10 right-6 z-20 text-white/50 text-sm">
          <span className="text-primary font-medium">{String(heroIndex + 1).padStart(2, "0")}</span>
          {" "}/ {String(property.images.length).padStart(2, "0")}
        </div>
      </section>

      {/* ── 2. PROJECT OVERVIEW ────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-5 font-medium">Overview</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-3">
                {extras.tagline}
              </h2>
              <div className="w-16 h-px bg-primary mb-8" />
              <p className="text-muted-foreground leading-[1.9] text-base mb-6">
                {property.description}
              </p>
              <p className="text-muted-foreground leading-[1.9] text-base mb-6">
                {extras.philosophy}
              </p>
              <p className="text-muted-foreground leading-[1.9] text-base">
                {extras.lifestyle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 lg:pt-20"
            >
              {/* Key details panel */}
              <div className="rounded-3xl bg-card border border-white/[0.08] p-8">
                <h3 className="font-serif text-xl text-foreground mb-6">Development Summary</h3>
                <div className="space-y-4">
                  {[
                    { icon: Home, label: "Development Type", value: property.type },
                    { icon: MapPin, label: "Location", value: property.location },
                    { icon: Calendar, label: "Completion", value: extras.completionDate },
                    { icon: Layers, label: "Storeys", value: `${extras.storeys} floors` },
                    { icon: Building2, label: "Total Units", value: `${extras.units} residences` },
                    { icon: Maximize2, label: "Site Area", value: `${extras.acreage} acres` },
                    { icon: TrendingUp, label: "Starting Price", value: property.price },
                  ].map(({ icon: Icon, label, value }, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/[0.05] last:border-0">
                      <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        <Icon className="w-4 h-4 text-primary/60" />
                        {label}
                      </div>
                      <span className="text-foreground text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features list */}
              <div className="rounded-3xl bg-card border border-white/[0.08] p-8">
                <h3 className="font-serif text-xl text-foreground mb-5">Key Features</h3>
                <div className="grid grid-cols-1 gap-2.5">
                  {property.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. PROJECT STATS ───────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Residences", value: extras.units, suffix: "", icon: Home },
              { label: "Site Acreage", value: parseFloat(extras.acreage), suffix: " ac", icon: Maximize2 },
              { label: "Floors", value: extras.storeys, suffix: "", icon: Building2 },
              { label: "Years Warranty", value: 10, suffix: "yr", icon: Shield },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-background border border-white/[0.08] p-8 text-center group hover:border-primary/30 transition-all duration-500"
                  data-testid={`stat-card-${i}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. AMENITIES ──────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Residents Only</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-xl">
              World-Class Amenities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {amenities.map((a, i) => {
              const Icon = a.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl border border-white/[0.08] p-8 overflow-hidden cursor-default transition-all duration-500 hover:border-primary/40 hover:-translate-y-1.5"
                  style={{ background: "rgba(22,31,44,0.6)", backdropFilter: "blur(12px)" }}
                  data-testid={`amenity-card-${i}`}
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(200,164,107,0.12) 0%, transparent 70%)" }} />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {a.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. FLOOR PLANS ───────────────────────────────────────────────── */}
      <section
        id="floor-plans"
        className="py-32 border-y border-white/[0.06] bg-card/30"
        data-testid="section-floor-plans"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Residences</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Floor Plans</h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-10" data-testid="floor-plan-tabs">
            {extras.floorPlans.map((plan, i) => (
              <button
                key={i}
                onClick={() => setActivePlan(i)}
                data-testid={`tab-plan-${i}`}
                className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                  activePlan === i
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-background border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {plan.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
            >
              {/* SVG Plan */}
              <div className="lg:col-span-2 relative">
                <div className="rounded-3xl bg-background border border-white/[0.08] p-4 md:p-6 aspect-[4/3] relative group overflow-hidden">
                  <FloorPlanSVG rooms={extras.floorPlans[activePlan].rooms} />
                  {/* Zoom button */}
                  <button
                    onClick={() => setPlanZoom(true)}
                    data-testid="button-plan-zoom"
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/20"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-3 mb-6 lg:mb-0 text-xs text-muted-foreground/60 italic px-1">
                  Indicative only — not to scale
                </p>
              </div>

              {/* Plan details */}
              <div className="rounded-3xl bg-background border border-white/[0.08] p-8">
                <h3 className="font-serif text-2xl text-foreground mb-2">
                  {extras.floorPlans[activePlan].label}
                </h3>
                <p className="font-serif text-2xl text-primary mb-6">
                  {extras.floorPlans[activePlan].price}
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    { icon: Bed, label: "Bedrooms", val: extras.floorPlans[activePlan].beds },
                    { icon: Bath, label: "Bathrooms", val: extras.floorPlans[activePlan].baths },
                    { icon: Maximize2, label: "Area", val: `${extras.floorPlans[activePlan].sqft.toLocaleString()} sqft` },
                  ].map(({ icon: Icon, label, val }, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-white/[0.06]">
                      <div className="flex items-center gap-2.5 text-muted-foreground text-sm">
                        <Icon className="w-4 h-4 text-primary/60" />
                        {label}
                      </div>
                      <span className="text-foreground text-sm font-medium">{val}</span>
                    </div>
                  ))}
                </div>

                <Link href="/contact">
                  <button className="w-full py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                    Enquire About This Unit
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Plan zoom modal */}
        <AnimatePresence>
          {planZoom && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
              data-testid="plan-zoom-modal"
            >
              <div className="absolute inset-0 bg-background/85 backdrop-blur-xl" onClick={() => setPlanZoom(false)} />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-3xl rounded-3xl bg-card border border-white/[0.1] p-8 shadow-2xl"
              >
                <button
                  onClick={() => setPlanZoom(false)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 border border-white/[0.1] flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <h3 className="font-serif text-xl text-foreground mb-6">{extras.floorPlans[activePlan].label}</h3>
                <div className="aspect-[4/3]">
                  <FloorPlanSVG rooms={extras.floorPlans[activePlan].rooms} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 6. GALLERY ────────────────────────────────────────────────── */}
      <section className="py-32" data-testid="section-gallery">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Photography</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Gallery</h2>
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
                className="break-inside-avoid mb-4 relative group rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: i % 3 === 1 ? "4/5" : "4/3" }}
                onClick={() => setLightbox(i)}
                data-testid={`gallery-image-${i}`}
              >
                <img
                  src={src}
                  alt={`${property.name} gallery ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
              data-testid="gallery-lightbox"
            >
              <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" onClick={() => setLightbox(null)} />
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative max-w-5xl w-full mx-6 rounded-3xl overflow-hidden"
              >
                <img
                  src={galleryImages[lightbox]}
                  alt=""
                  className="w-full max-h-[85vh] object-contain"
                />
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/[0.1] flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/[0.1] flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setLightbox((lightbox + 1) % galleryImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/[0.1] flex items-center justify-center text-white hover:text-primary transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                  {lightbox + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 7. LOCATION EXPERIENCE ─────────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] bg-card/30" data-testid="section-location">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: description + map visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Location</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                An Address That Opens Every Door
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Position is not an afterthought at Akon Homes — it is where every project begins. {property.name} occupies a site that places residents at the centre of {property.location}'s most important commercial, cultural, and leisure destinations.
              </p>

              {/* Stylised location visual */}
              <div className="rounded-3xl bg-background border border-white/[0.08] p-6 relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(200,164,107,0.1) 0%, transparent 60%), #0a1218" }}>
                  <svg className="w-full h-full opacity-10">
                    <defs>
                      <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#C8A46B" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-grid)" />
                  </svg>
                </div>
                {/* Concentric circles */}
                {[80, 140, 200].map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.15 }}
                    className="absolute rounded-full border border-primary/20"
                    style={{
                      width: r * 2,
                      height: r * 2,
                      top: "50%",
                      left: "40%",
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                ))}
                {/* Centre pin */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute"
                  style={{ top: "50%", left: "40%", transform: "translate(-50%,-50%)" }}
                >
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/60" />
                  <motion.div
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-primary"
                  />
                </motion.div>
                {/* Property label */}
                <div className="absolute" style={{ top: "42%", left: "44%" }}>
                  <div className="px-3 py-1.5 rounded-xl bg-primary/90 text-primary-foreground text-xs font-medium whitespace-nowrap">
                    {property.name}
                  </div>
                </div>
                {/* Labels for landmarks */}
                {[
                  { label: "CBD", top: "30%", left: "58%" },
                  { label: "Beach", top: "62%", left: "22%" },
                  { label: "Airport", top: "20%", left: "75%" },
                ].map((lm, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="absolute"
                    style={{ top: lm.top, left: lm.left }}
                  >
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/60 mb-1" />
                    <p className="text-muted-foreground text-[10px]">{lm.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: landmark cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {extras.landmarks.map((lm, i) => {
                const Icon = catIcon[lm.category] ?? MapPin;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="flex items-center gap-4 rounded-2xl bg-background border border-white/[0.08] px-5 py-4 group hover:border-primary/30 transition-all duration-300"
                    data-testid={`landmark-card-${i}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground text-sm font-medium">{lm.name}</p>
                      <p className="text-muted-foreground text-xs">{lm.category}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-primary text-sm font-medium">{lm.distance}</p>
                      <div className="flex items-center gap-1 justify-end text-muted-foreground text-xs">
                        <Clock className="w-3 h-3" />
                        {lm.time}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Commute summary */}
              <div className="rounded-2xl bg-primary/8 border border-primary/20 px-5 py-4 mt-4">
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-medium">Excellent connectivity</span> — major business districts, transport hubs, and leisure destinations all within easy reach.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. PAYMENT PLANS ─────────────────────────────────────────────── */}
      <section className="py-32" data-testid="section-payment-plans">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Financing</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Payment Plans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {extras.paymentPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`relative rounded-3xl p-8 border flex flex-col transition-all duration-500 hover:-translate-y-1 ${
                  plan.highlight
                    ? "bg-primary/10 border-primary/40 shadow-xl shadow-primary/10"
                    : "bg-card border-white/[0.08] hover:border-primary/25"
                }`}
                data-testid={`payment-card-${i}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  {plan.icon === "🏠" && <Home className="w-6 h-6 text-primary" />}
                  {plan.icon === "📅" && <Calendar className="w-6 h-6 text-primary" />}
                  {plan.icon === "📋" && <Layers className="w-6 h-6 text-primary" />}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">Flexible payment structure</p>

                <div className="space-y-4 flex-1">
                  <div className="rounded-2xl bg-background/40 border border-white/[0.06] p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Initial Deposit</p>
                    <p className="font-serif text-3xl text-primary">{plan.deposit}</p>
                    <p className="text-muted-foreground text-xs mt-1">of purchase price on exchange</p>
                  </div>
                  <div className="rounded-2xl bg-background/40 border border-white/[0.06] p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Instalments</p>
                    <p className="text-foreground font-medium">{plan.installments}</p>
                  </div>
                  <div className="rounded-2xl bg-background/40 border border-white/[0.06] p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-foreground font-medium">{plan.duration}</p>
                  </div>
                </div>

                <Link href="/contact" className="mt-6">
                  <button className={`w-full py-3.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    plan.highlight
                      ? "bg-primary text-primary-foreground hover:bg-accent hover:shadow-lg hover:shadow-primary/20"
                      : "border border-white/[0.1] text-foreground hover:border-primary/40 hover:text-primary"
                  }`}>
                    Select This Plan
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Financing note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-card/50 border border-white/[0.06] p-8 flex flex-col md:flex-row gap-6 items-start"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-serif text-xl text-foreground mb-2">Mortgage & Finance Partnerships</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                We work with a network of leading banks and specialist lenders to offer preferential mortgage terms for qualifying buyers — including diaspora-focused products with no minimum UK/Nigeria residency requirement.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {["Dollar-denominated available", "Up to 70% LTV", "10–25 year terms", "No hidden charges"].map((f, i) => (
                  <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-white/[0.06]">
                    <Check className="w-3 h-3 text-primary" />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 9. CONSTRUCTION TIMELINE ───────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] bg-card/30 overflow-hidden" data-testid="section-timeline">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Progress</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Construction Timeline</h2>
          </div>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="relative">
            {/* Line */}
            <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-white/[0.06]" />
            <motion.div
              className="hidden md:block absolute top-10 left-0 h-px bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${(extras.timeline.filter(p => p.done).length / extras.timeline.length) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            />

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
              {extras.timeline.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative flex flex-col items-center text-center"
                  data-testid={`timeline-phase-${i}`}
                >
                  {/* Node */}
                  <div className={`relative z-10 w-5 h-5 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-500 ${
                    phase.done
                      ? "bg-primary border-primary shadow-md shadow-primary/50"
                      : "bg-background border-white/20"
                  }`}>
                    {phase.done && <Check className="w-2.5 h-2.5 text-primary-foreground" />}
                  </div>
                  {/* Phase number */}
                  <span className="text-xs text-primary/60 font-medium mb-1">{phase.phase}</span>
                  {/* Label */}
                  <p className={`text-sm font-medium mb-1 leading-tight ${phase.done ? "text-foreground" : "text-muted-foreground"}`}>
                    {phase.label}
                  </p>
                  {/* Date */}
                  <span className={`text-xs px-2.5 py-1 rounded-full ${
                    phase.done
                      ? "bg-primary/15 text-primary"
                      : "bg-white/[0.04] text-muted-foreground border border-white/[0.06]"
                  }`}>
                    {phase.date}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-32" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Common Questions</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Frequently Asked</h2>
          </div>
          <div>
            {extras.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. INQUIRY SECTION ───────────────────────────────────────── */}
      <section className="py-32 border-t border-white/[0.06] bg-card/30" data-testid="section-inquiry">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-5 font-medium">Enquire Now</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Begin your journey to {property.name}.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                Complete the form and a dedicated sales advisor will contact you within one business day — no obligation, complete discretion.
              </p>

              {/* Contact options */}
              <div className="space-y-3 mb-10">
                {[
                  { icon: Phone, label: "Call us directly", value: "+234 (0) 1 700 8800" },
                  { icon: MessageCircle, label: "WhatsApp", value: "Chat instantly with our team" },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-2xl bg-background border border-white/[0.08] px-5 py-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">{label}</p>
                      <p className="text-foreground text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Property snapshot */}
              <div className="rounded-3xl overflow-hidden border border-white/[0.08]">
                <img
                  src={property.images[0]}
                  alt={property.name}
                  className="w-full aspect-video object-cover"
                />
                <div className="bg-card p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg text-foreground">{property.name}</h4>
                      <p className="text-muted-foreground text-sm">{property.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-medium text-sm">{property.price}</p>
                      <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[property.status]}`}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <InquiryForm propertyName={property.name} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RELATED DEVELOPMENTS ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-3xl text-foreground">You May Also Like</h2>
            <Link href="/developments">
              <button className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                All Developments
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/developments/${p.id}`}>
                  <div className="group rounded-3xl overflow-hidden bg-card border border-white/[0.08] hover:border-primary/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <span className={`absolute top-3 left-3 text-xs px-3 py-1.5 rounded-full border backdrop-blur-sm ${statusColors[p.status]}`}>{p.status}</span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors">{p.name}</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" />{p.location}</span>
                        <span className="text-primary">{p.price}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ArrowRight import alias
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
