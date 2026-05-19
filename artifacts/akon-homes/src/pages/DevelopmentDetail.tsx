import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Bed, Bath, Maximize2, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import GallerySlider from "@/components/GallerySlider";
import InquiryForm from "@/components/InquiryForm";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/properties";

const statusColors: Record<string, string> = {
  "Now Selling": "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
  "Coming Soon": "bg-amber-900/60 text-amber-300 border-amber-700/40",
  "Sold Out": "bg-zinc-800/60 text-zinc-400 border-zinc-600/40",
  "Under Construction": "bg-blue-900/60 text-blue-300 border-blue-700/40",
};

export default function DevelopmentDetail() {
  const { id } = useParams<{ id: string }>();
  const property = properties.find((p) => p.id === id);
  const related = properties.filter((p) => p.id !== id).slice(0, 3);

  if (!property) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl text-foreground mb-4">Development Not Found</h1>
        <p className="text-muted-foreground mb-8">This development may have been removed or the URL is incorrect.</p>
        <Link href="/developments">
          <button className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Developments
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Back nav */}
      <div className="pt-32 pb-8 max-w-7xl mx-auto px-6">
        <Link href="/developments" data-testid="link-back-developments">
          <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            All Developments
          </button>
        </Link>
      </div>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GallerySlider images={property.images} alt={property.name} />
        </motion.div>
      </section>

      {/* Detail Layout */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Description */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-start gap-4 mb-6">
                <span
                  className={`text-xs tracking-wide px-3 py-1.5 rounded-full border backdrop-blur-sm ${statusColors[property.status]}`}
                >
                  {property.status}
                </span>
                <span className="text-xs tracking-wide px-3 py-1.5 rounded-full bg-card border border-white/[0.08] text-muted-foreground">
                  {property.type}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-3 leading-tight">
                {property.name}
              </h1>

              <div className="flex items-center gap-1.5 text-muted-foreground mb-8">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{property.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10 p-6 rounded-2xl bg-card border border-white/[0.08]">
                <div className="text-center" data-testid={`spec-beds-${property.id}`}>
                  <Bed className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-medium">{property.beds}</p>
                  <p className="text-muted-foreground text-xs">Bedrooms</p>
                </div>
                <div className="text-center" data-testid={`spec-baths-${property.id}`}>
                  <Bath className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-medium">{property.baths}</p>
                  <p className="text-muted-foreground text-xs">Bathrooms</p>
                </div>
                <div className="text-center" data-testid={`spec-sqft-${property.id}`}>
                  <Maximize2 className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-foreground font-medium">{property.sqft.toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs">Sq. Ft.</p>
                </div>
              </div>

              <div className="mb-10">
                <h2 className="font-serif text-2xl text-foreground mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  {property.description}
                </p>
              </div>

              <div className="mb-10">
                <h2 className="font-serif text-2xl text-foreground mb-6">Features & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-muted-foreground text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-white/[0.08] flex items-center gap-4">
                <Calendar className="w-5 h-5 text-primary shrink-0" />
                <div>
                  <p className="text-foreground font-medium text-sm">Completion</p>
                  <p className="text-muted-foreground text-sm">{property.yearCompletion}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Pricing + Form */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl bg-card border border-white/[0.08] p-8"
              data-testid="pricing-card"
            >
              <p className="text-muted-foreground text-xs tracking-wide uppercase mb-2">Starting From</p>
              <p className="font-serif text-3xl text-primary mb-1">{property.price}</p>
              <p className="text-muted-foreground text-sm mb-6">{property.type} · {property.location}</p>
              <div className="border-t border-white/[0.06] pt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-foreground">{property.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="text-foreground">{property.yearCompletion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="text-foreground">{property.country}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <InquiryForm propertyName={property.name} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-foreground mb-12">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
