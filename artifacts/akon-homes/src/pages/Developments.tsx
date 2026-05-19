import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import PropertyCard from "@/components/PropertyCard";
import CTASection from "@/components/CTASection";
import { properties } from "@/data/properties";
import type { Property } from "@/data/properties";

const statusFilters: Array<Property["status"] | "All"> = [
  "All",
  "Now Selling",
  "Coming Soon",
  "Under Construction",
  "Sold Out",
];

const typeFilters: Array<Property["type"] | "All"> = [
  "All",
  "Apartments",
  "Townhouses",
  "Penthouses",
  "Villas",
  "Waterfront",
];

export default function Developments() {
  const [activeStatus, setActiveStatus] = useState<Property["status"] | "All">("All");
  const [activeType, setActiveType] = useState<Property["type"] | "All">("All");

  const filtered = properties.filter((p) => {
    const matchStatus = activeStatus === "All" || p.status === activeStatus;
    const matchType = activeType === "All" || p.type === activeType;
    return matchStatus && matchType;
  });

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,164,107,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
              Our Portfolio
            </p>
            <h1 className="font-serif text-6xl md:text-8xl text-foreground leading-tight mb-6">
              Our<br />
              <span className="text-primary italic">Developments</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              A curated collection of bespoke residential and mixed-use developments crafted for those who expect the extraordinary.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex flex-wrap gap-2" data-testid="filter-status">
            {statusFilters.map((f) => (
              <button
                key={f}
                data-testid={`filter-status-${f}`}
                onClick={() => setActiveStatus(f as Property["status"] | "All")}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeStatus === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/60 border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" data-testid="filter-type">
            {typeFilters.map((f) => (
              <button
                key={f}
                data-testid={`filter-type-${f}`}
                onClick={() => setActiveType(f as Property["type"] | "All")}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeType === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/60 border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <p className="text-muted-foreground text-sm pt-2">
            Showing {filtered.length} of {properties.length} developments
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-muted-foreground"
            >
              <p className="font-serif text-2xl text-foreground mb-3">No developments match your filters</p>
              <p className="text-sm">Try adjusting your selection above.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Private Viewings"
        title={"Can't find what\nyou're looking for?"}
        subtitle="Our advisory team can source off-market opportunities tailored to your specific requirements."
        primaryLabel="Speak with an Advisor"
        primaryHref="/contact"
      />
    </div>
  );
}
