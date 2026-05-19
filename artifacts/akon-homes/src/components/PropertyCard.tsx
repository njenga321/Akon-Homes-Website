import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Bed, Bath, Maximize2 } from "lucide-react";
import type { Property } from "@/data/properties";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const statusColors: Record<Property["status"], string> = {
  "Now Selling": "bg-emerald-900/60 text-emerald-300 border-emerald-700/40",
  "Coming Soon": "bg-amber-900/60 text-amber-300 border-amber-700/40",
  "Sold Out": "bg-zinc-800/60 text-zinc-400 border-zinc-600/40",
  "Under Construction": "bg-blue-900/60 text-blue-300 border-blue-700/40",
};

export default function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/developments/${property.id}`} data-testid={`card-property-${property.id}`}>
        <div className="group cursor-pointer rounded-3xl overflow-hidden bg-card border border-white/[0.08] transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/40">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span
              className={`absolute top-4 left-4 text-xs tracking-wide px-3 py-1.5 rounded-full border backdrop-blur-sm ${statusColors[property.status]}`}
              data-testid={`badge-status-${property.id}`}
            >
              {property.status}
            </span>
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {property.name}
                </h3>
                <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-primary font-medium text-sm">{property.price}</p>
                <p className="text-muted-foreground text-xs mt-0.5">{property.type}</p>
              </div>
            </div>

            <div className="border-t border-white/[0.06] pt-4 flex items-center gap-5 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5" data-testid={`text-beds-${property.id}`}>
                <Bed className="w-3.5 h-3.5" />
                <span>{property.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1.5" data-testid={`text-baths-${property.id}`}>
                <Bath className="w-3.5 h-3.5" />
                <span>{property.baths} Baths</span>
              </div>
              <div className="flex items-center gap-1.5" data-testid={`text-sqft-${property.id}`}>
                <Maximize2 className="w-3.5 h-3.5" />
                <span>{property.sqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
