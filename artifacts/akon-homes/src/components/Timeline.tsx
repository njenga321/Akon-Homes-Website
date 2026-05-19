import { motion } from "framer-motion";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      <div className="absolute left-[calc(6rem)] top-0 bottom-0 w-px bg-white/[0.08] hidden md:block" />
      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-8 md:gap-12 items-start"
            data-testid={`timeline-item-${i}`}
          >
            <div className="shrink-0 w-24 text-right">
              <span className="font-serif text-lg text-primary">{item.year}</span>
            </div>
            <div className="relative pt-1 flex-1">
              <div className="absolute -left-[calc(0.5rem+1px)] top-2.5 w-3 h-3 rounded-full bg-primary border-2 border-background hidden md:block" />
              <h4 className="text-foreground font-medium mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
