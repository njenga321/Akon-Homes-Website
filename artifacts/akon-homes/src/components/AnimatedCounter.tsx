import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { Stat } from "@/data/stats";

interface AnimatedCounterProps {
  stat: Stat;
  index?: number;
}

export default function AnimatedCounter({ stat, index = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const duration = 2000;

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const endValue = stat.value;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * endValue));
      if (progress < 1) requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => requestAnimationFrame(animate), index * 150);
    return () => clearTimeout(timer);
  }, [isInView, stat.value, index]);

  return (
    <div
      ref={ref}
      className="text-center"
      data-testid={`counter-stat-${index}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
      }}
    >
      <div className="font-serif text-5xl md:text-6xl text-foreground mb-2">
        {count.toLocaleString()}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      <p className="text-muted-foreground text-sm tracking-wide uppercase">{stat.label}</p>
    </div>
  );
}
