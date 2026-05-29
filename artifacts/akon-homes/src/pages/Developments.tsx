import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronDown,
  SlidersHorizontal,
  X,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Home,
  CheckCircle2,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { properties } from "@/data/properties";
import type { Property } from "@/data/properties";

// ── Types ─────────────────────────────────────────────────────────────────
type StatusFilter = "All" | Property["status"];
type TypeFilter = "All" | Property["type"];
type LocationFilter = "All" | string;
type PriceFilter = "All" | "under-300k" | "300k-600k" | "600k-1m" | "over-1m";

// ── Helpers ───────────────────────────────────────────────────────────────
const statusOptions: StatusFilter[] = ["All", "Now Selling", "Coming Soon", "Under Construction", "Sold Out"];
const typeOptions: TypeFilter[] = ["All", "Apartments", "Townhouses", "Penthouses", "Villas", "Waterfront"];
const locationOptions: LocationFilter[] = ["All", "Lagos", "Abuja", "Port Harcourt", "London"];
const priceOptions: { value: PriceFilter; label: string }[] = [
  { value: "All", label: "Any Price" },
  { value: "under-300k", label: "Under $300k" },
  { value: "300k-600k", label: "$300k – $600k" },
  { value: "600k-1m", label: "$600k – $1m" },
  { value: "over-1m", label: "Over $1m" },
];

const statusColors: Record<string, string> = {
  "Now Selling": "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
  "Coming Soon": "bg-amber-900/60 text-amber-300 border-amber-700/40",
  "Sold Out": "bg-zinc-800/60 text-zinc-400 border-zinc-600/40",
  "Under Construction": "bg-blue-900/60 text-blue-300 border-blue-700/40",
};

function priceMatch(p: Property, range: PriceFilter): boolean {
  if (range === "All") return true;
  const v = p.priceFrom;
  if (range === "under-300k") return v < 300000;
  if (range === "300k-600k") return v >= 300000 && v < 600000;
  if (range === "600k-1m") return v >= 600000 && v < 1000000;
  if (range === "over-1m") return v >= 1000000;
  return true;
}

function locationMatch(p: Property, loc: LocationFilter): boolean {
  if (loc === "All") return true;
  return p.location.includes(loc);
}

// ── Dropdown component ────────────────────────────────────────────────────
function FilterDropdown<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-all duration-300 whitespace-nowrap ${
          value !== ("All" as T)
            ? "border-primary/60 bg-primary/10 text-primary"
            : "border-white/[0.08] bg-card/60 text-muted-foreground hover:border-primary/30 hover:text-foreground"
        }`}
      >
        <span>{label}: </span>
        <span className="font-medium">{selected?.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 left-0 min-w-[180px] rounded-2xl bg-card border border-white/[0.1] shadow-2xl shadow-black/60 z-30 overflow-hidden"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left px-5 py-3 text-sm transition-colors duration-150 ${
                  value === opt.value
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Quick Preview Modal ────────────────────────────────────────────────────
function QuickPreviewModal({
  property,
  onClose,
}: {
  property: Property;
  onClose: () => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [slideIndex, setSlideIndex] = useState(0);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSlideIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        data-testid="quick-preview-modal"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl rounded-3xl bg-card border border-white/[0.1] overflow-hidden shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            data-testid="button-modal-close"
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.1] flex items-center justify-center text-white hover:text-primary transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery */}
            <div className="relative aspect-square md:aspect-auto overflow-hidden group">
              <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                  {property.images.map((src, i) => (
                    <div key={i} className="relative flex-none w-full min-h-[280px] md:min-h-[420px]">
                      <img src={src} alt={property.name} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {/* Slide controls */}
              <button
                onClick={scrollPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {property.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === slideIndex ? "bg-primary w-4" : "bg-white/40"}`}
                  />
                ))}
              </div>
              {/* Status badge */}
              <span className={`absolute top-3 left-3 text-xs px-3 py-1.5 rounded-full border backdrop-blur-sm ${statusColors[property.status]}`}>
                {property.status}
              </span>
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col">
              <div className="mb-1">
                <span className="text-xs tracking-widest uppercase text-primary/70">{property.type}</span>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2 leading-tight">{property.name}</h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {property.location}
              </div>

              <p className="font-serif text-3xl text-primary mb-6">{property.price}</p>

              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-background/60 border border-white/[0.06]">
                <div className="text-center">
                  <Bed className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-foreground text-sm font-medium">{property.beds}</p>
                  <p className="text-muted-foreground text-xs">Beds</p>
                </div>
                <div className="text-center">
                  <Bath className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-foreground text-sm font-medium">{property.baths}</p>
                  <p className="text-muted-foreground text-xs">Baths</p>
                </div>
                <div className="text-center">
                  <Maximize2 className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-foreground text-sm font-medium">{property.sqft.toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs">Sq. Ft.</p>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1 line-clamp-4">
                {property.description}
              </p>

              <div className="space-y-3">
                <Link href={`/developments/${property.id}`} data-testid={`link-modal-view-${property.id}`}>
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  >
                    View Full Details
                  </button>
                </Link>
                <Link href="/contact">
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-full border border-white/[0.1] text-foreground font-medium text-sm hover:border-primary/40 hover:text-primary transition-all duration-300"
                  >
                    Register Interest
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Property Card with Quick Preview ──────────────────────────────────────
function DevelopmentCard({
  property,
  index,
  onPreview,
}: {
  property: Property;
  index: number;
  onPreview: (p: Property) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      layout
      className="group rounded-3xl overflow-hidden bg-card border border-white/[0.08] flex flex-col transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1.5"
      data-testid={`card-dev-${property.id}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
          style={{ transform: "scale(1)", transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Status badge */}
        <span className={`absolute top-4 left-4 text-xs tracking-wide px-3 py-1.5 rounded-full border backdrop-blur-sm ${statusColors[property.status]}`}>
          {property.status}
        </span>

        {/* Quick Preview button — visible on hover */}
        <button
          onClick={() => onPreview(property)}
          data-testid={`button-preview-${property.id}`}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.15] text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/80 hover:border-primary/60"
        >
          <Eye className="w-3 h-3" />
          Quick View
        </button>

        {/* Price overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-white/70 text-xs mb-0.5">{property.type}</p>
              <p className="text-white font-serif text-xl leading-tight">{property.name}</p>
            </div>
            <p className="text-primary font-medium text-sm bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/30">
              {property.price}
            </p>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
          <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>{property.location}</span>
        </div>

        {/* Specs row */}
        <div className="flex items-center gap-5 text-xs text-muted-foreground mb-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            {property.beds} Beds
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-3.5 h-3.5" />
            {property.baths} Baths
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5" />
            {property.sqft.toLocaleString()} sqft
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-auto flex gap-2">
          <Link href={`/developments/${property.id}`} className="flex-1">
            <button className="w-full py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              View Details
            </button>
          </Link>
          <button
            onClick={() => onPreview(property)}
            className="w-10 h-10 rounded-full bg-card border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Map markers data ───────────────────────────────────────────────────────
const mapMarkers = [
  { id: "lagos", label: "Lagos", count: 3, x: "28%", y: "52%" },
  { id: "abuja", label: "Abuja", count: 2, x: "36%", y: "44%" },
  { id: "portharcourt", label: "Port Harcourt", count: 1, x: "34%", y: "57%" },
  { id: "london", label: "London", count: 1, x: "42%", y: "20%" },
];

// ── Main page ─────────────────────────────────────────────────────────────
export default function Developments() {
  const [status, setStatus] = useState<StatusFilter>("All");
  const [type, setType] = useState<TypeFilter>("All");
  const [location, setLocation] = useState<LocationFilter>("All");
  const [price, setPrice] = useState<PriceFilter>("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [preview, setPreview] = useState<Property | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const activeCount = [
    status !== "All",
    type !== "All",
    location !== "All",
    price !== "All",
  ].filter(Boolean).length;

  const filtered = properties.filter(
    (p) =>
      (status === "All" || p.status === status) &&
      (type === "All" || p.type === type) &&
      locationMatch(p, location) &&
      priceMatch(p, price)
  );

  const clearAll = () => {
    setStatus("All");
    setType("All");
    setLocation("All");
    setPrice("All");
  };

  return (
    <div>
      {/* Sticky wrapper — filter bar only sticks within this div */}
      <div className="relative">
      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end pb-28 overflow-hidden bg-background">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=85&auto=format&fit=crop"
            alt="Akon Homes developments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/60 to-background" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 pt-40 w-full">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs text-muted-foreground mb-8"
            data-testid="breadcrumb"
          >
            <Link href="/">
              <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                <Home className="w-3 h-3" />
                Home
              </span>
            </Link>
            <span className="text-white/20">/</span>
            <span className="text-primary">Developments</span>
          </motion.nav>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xs tracking-[0.25em] uppercase text-primary mb-5 font-medium"
          >
            Our Portfolio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl text-foreground leading-[0.92] mb-6"
          >
            Our<br />
            <span className="text-primary italic">Developments</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-xl leading-relaxed"
          >
            A curated collection of bespoke residential and mixed-use developments across Nigeria and the United Kingdom — crafted for those who expect the extraordinary.
          </motion.p>
        </div>
      </section>

      {/* ── 2. FILTER SYSTEM ─────────────────────────────────────────────── */}
      <section className="sticky top-[72px] z-20 bg-background/90 backdrop-blur-xl border-b border-white/[0.06] py-4">
        <div className="max-w-7xl mx-auto px-6">
          {/* Desktop filters */}
          <div className="hidden md:block" data-testid="desktop-filters">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Status pills */}
            <div className="flex gap-2 flex-wrap">
              {statusOptions.map((s) => (
                <button
                  key={s}
                  data-testid={`pill-status-${s}`}
                  onClick={() => setStatus(s)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    status === s
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-card/60 border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-white/[0.08] mx-1" />

            {/* Dropdowns */}
            <FilterDropdown
              label="Location"
              options={locationOptions.map((l) => ({ value: l, label: l }))}
              value={location}
              onChange={setLocation}
            />
            <FilterDropdown
              label="Type"
              options={typeOptions.map((t) => ({ value: t, label: t }))}
              value={type}
              onChange={setType}
            />
            <FilterDropdown
              label="Price"
              options={priceOptions}
              value={price}
              onChange={setPrice}
            />

            {/* Clear */}
            <AnimatePresence>
              {activeCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearAll}
                  data-testid="button-clear-filters"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.08] text-muted-foreground text-xs hover:text-foreground hover:border-white/20 transition-all duration-300"
                >
                  <X className="w-3 h-3" />
                  Clear ({activeCount})
                </motion.button>
              )}
            </AnimatePresence>

          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            <span className="text-foreground font-medium">{filtered.length}</span> developments
          </div>
          </div>

          {/* Mobile filter toggle */}
          <div className="md:hidden flex items-center justify-between" data-testid="mobile-filter-bar">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-300"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </button>
            <span className="text-xs text-muted-foreground">
              <span className="text-foreground font-medium">{filtered.length}</span> results
            </span>
          </div>
        </div>

        {/* Mobile filter drawer */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden border-t border-white/[0.06]"
              data-testid="mobile-filter-drawer"
            >
              <div className="max-w-7xl mx-auto px-6 py-5 space-y-5">
                {/* Status */}
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-4 py-2 rounded-full text-xs transition-all duration-200 ${
                          status === s
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-white/[0.08] text-muted-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Type */}
                <div>
                  <p className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Type</p>
                  <div className="flex flex-wrap gap-2">
                    {typeOptions.map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t as TypeFilter)}
                        className={`px-4 py-2 rounded-full text-xs transition-all duration-200 ${
                          type === t
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-white/[0.08] text-muted-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Location */}
                <div>
                  <p className="text-xs tracking-widests uppercase text-muted-foreground mb-3">Location</p>
                  <div className="flex flex-wrap gap-2">
                    {locationOptions.map((l) => (
                      <button
                        key={l}
                        onClick={() => setLocation(l)}
                        className={`px-4 py-2 rounded-full text-xs transition-all duration-200 ${
                          location === l
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-white/[0.08] text-muted-foreground"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Price */}
                <div>
                  <p className="text-xs tracking-widests uppercase text-muted-foreground mb-3">Price Range</p>
                  <div className="flex flex-wrap gap-2">
                    {priceOptions.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setPrice(p.value)}
                        className={`px-4 py-2 rounded-full text-xs transition-all duration-200 ${
                          price === p.value
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-white/[0.08] text-muted-foreground"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  {activeCount > 0 && (
                    <button
                      onClick={clearAll}
                      className="flex-1 py-3 rounded-full border border-white/[0.1] text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="flex-1 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                  >
                    Show {filtered.length} Results
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── 3. PROPERTY GRID ─────────────────────────────────────────────── */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-32"
                data-testid="empty-state"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-3">No results found</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your filters to see more developments.</p>
                <button
                  onClick={clearAll}
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-accent transition-colors"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((property, i) => (
                  <DevelopmentCard
                    key={property.id}
                    property={property}
                    index={i}
                    onPreview={setPreview}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      </div>{/* end sticky wrapper */}

      {/* ── 5. MAP SECTION ───────────────────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] bg-card/30" data-testid="section-map">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium"
              >
                Where We Build
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl text-foreground leading-tight"
              >
                Our Global Footprint
              </motion.h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
              From the Atlantic coastline of Lagos to the financial corridors of London — Akon Homes builds wherever excellence is demanded.
            </p>
          </div>

          {/* Map + Markers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-3xl overflow-hidden border border-white/[0.08]"
            style={{ aspectRatio: "21/9" }}
          >
            {/* Map background */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse at 35% 55%, rgba(200,164,107,0.06) 0%, transparent 60%), #0d1820",
              }}
            >
              {/* Grid lines */}
              <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C8A46B" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Continent silhouettes (simplified) */}
              <svg
                className="absolute inset-0 w-full h-full opacity-15"
                viewBox="0 0 1000 430"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Africa */}
                <path
                  d="M290 80 Q340 60 380 90 Q420 110 430 160 Q440 210 420 260 Q400 310 360 350 Q320 380 290 360 Q260 340 250 300 Q235 250 245 200 Q255 150 270 110 Z"
                  fill="#C8A46B"
                  opacity="0.5"
                />
                {/* Europe */}
                <path
                  d="M340 20 Q380 10 420 30 Q450 45 440 70 Q420 90 390 80 Q360 70 340 50 Z"
                  fill="#C8A46B"
                  opacity="0.4"
                />
                {/* UK island */}
                <path
                  d="M390 15 Q410 8 425 18 Q430 28 415 35 Q398 38 388 28 Z"
                  fill="#C8A46B"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Animated markers */}
            {mapMarkers.map((marker, i) => (
              <motion.div
                key={marker.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
                style={{ left: marker.x, top: marker.y, transform: "translate(-50%, -100%)" }}
                data-testid={`marker-${marker.id}`}
              >
                <button
                  onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
                  className="relative flex flex-col items-center group"
                >
                  {/* Pulse ring */}
                  <motion.div
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute w-6 h-6 rounded-full border-2 border-primary"
                    style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
                  />
                  {/* Pin */}
                  <div className="w-5 h-5 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/40 z-10" />
                  {/* Label */}
                  <div className="mt-2 px-2.5 py-1 rounded-lg bg-background/90 border border-white/[0.1] backdrop-blur-sm whitespace-nowrap">
                    <p className="text-foreground text-xs font-medium">{marker.label}</p>
                    <p className="text-primary text-xs">{marker.count} dev{marker.count !== 1 ? "s" : ""}</p>
                  </div>
                </button>

                {/* Tooltip on click */}
                <AnimatePresence>
                  {activeMarker === marker.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl bg-card border border-primary/30 shadow-xl z-30 whitespace-nowrap"
                    >
                      <p className="text-foreground font-medium text-sm mb-1">{marker.label}</p>
                      <p className="text-muted-foreground text-xs">{marker.count} active development{marker.count !== 1 ? "s" : ""}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-5 right-5 px-4 py-3 rounded-xl bg-background/80 border border-white/[0.08] backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span className="text-muted-foreground text-xs">Active Development</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full border border-primary/60" />
                <span className="text-muted-foreground text-xs">Click to explore</span>
              </div>
            </div>
          </motion.div>

          {/* City stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {mapMarkers.map((marker, i) => (
              <motion.div
                key={marker.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-background border border-white/[0.08] p-4 flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">{marker.label}</p>
                  <p className="text-muted-foreground text-xs">{marker.count} development{marker.count !== 1 ? "s" : ""}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. INVESTMENT CTA ────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,164,107,0.1) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto px-6 text-center"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">Investment Opportunity</p>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            Invest in property that<br />
            <span className="text-primary italic">appreciates with purpose.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Competitive yields, capital growth, and flexible payment structures designed for local buyers, returning diaspora, and international investors alike.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {[
              { value: "5–8%", label: "Gross Rental Yield" },
              { value: "48mo", label: "Payment Plans" },
              { value: "$USD", label: "Transactions" },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-card border border-white/[0.08] p-5 text-center"
              >
                <p className="font-serif text-2xl text-primary mb-1">{item.value}</p>
                <p className="text-muted-foreground text-xs tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-invest-contact">
              <button className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
                Speak with an Advisor
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/about" data-testid="button-invest-about">
              <button className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm tracking-wide hover:border-primary/50 hover:text-primary transition-all duration-300">
                Our Story
              </button>
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              "Instalment payment plans",
              "Off-plan pricing",
              "Dollar-denominated",
              "Mortgage partnerships",
            ].map((feat, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {feat}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── QUICK PREVIEW MODAL ───────────────────────────────────────────── */}
      {preview && (
        <QuickPreviewModal property={preview} onClose={() => setPreview(null)} />
      )}
    </div>
  );
}
