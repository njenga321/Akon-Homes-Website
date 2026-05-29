import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/2341700880"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-8 right-6 z-50 flex items-center gap-2.5 md:px-5 px-3.5 py-3.5 rounded-full bg-card border border-primary/30 backdrop-blur-sm shadow-2xl shadow-black/40 cursor-pointer hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
          aria-label="Chat on WhatsApp"
          data-testid="whatsapp-float"
        >
          <MessageCircle className="w-5 h-5 text-primary shrink-0" />
          <span className="hidden md:inline text-primary text-sm font-medium tracking-wide">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
