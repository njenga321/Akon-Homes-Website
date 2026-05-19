import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-3xl bg-card border border-white/[0.08] p-8 flex flex-col gap-6 h-full"
      data-testid={`card-testimonial-${testimonial.id}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
        <Quote className="w-8 h-8 text-primary/20" />
      </div>

      <blockquote className="text-muted-foreground leading-relaxed text-sm flex-1">
        "{testimonial.quote}"
      </blockquote>

      <div className="border-t border-white/[0.06] pt-5">
        <p className="text-foreground font-medium text-sm">{testimonial.author}</p>
        <p className="text-muted-foreground text-xs mt-0.5">{testimonial.title}</p>
        <p className="text-primary text-xs mt-1">{testimonial.property}</p>
      </div>
    </motion.div>
  );
}
