import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Home,
  ChevronDown,
  ArrowRight,
  ZoomIn,
  X,
} from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

// ── Data ────────────────────────────────────────────────────────────────

const offices = [
  {
    city: "Lagos",
    country: "Nigeria",
    address: "3 Sanusi Fafunwa Street, Victoria Island, Lagos 101001",
    phone: "+234 (0) 1 700 8800",
    email: "lagos@akonhomes.com",
    hours: "Mon – Fri: 8am – 6pm WAT",
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&q=80&auto=format&fit=crop",
    highlight: true,
  },
  {
    city: "Abuja",
    country: "Nigeria",
    address: "Plot 1234 Ahmadu Bello Way, Maitama, Abuja 900271",
    phone: "+234 (0) 9 876 5432",
    email: "abuja@akonhomes.com",
    hours: "Mon – Fri: 8am – 6pm WAT",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80&auto=format&fit=crop",
    highlight: false,
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "10 Portman Square, Marylebone, London W1H 6AZ",
    phone: "+44 (0) 20 7123 4567",
    email: "london@akonhomes.com",
    hours: "Mon – Fri: 9am – 5pm GMT",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&q=80&auto=format&fit=crop",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What is the best way to get started as a new buyer?",
    a: "The simplest first step is to complete our enquiry form or call your nearest office. One of our sales advisors will arrange a consultation — in person, by video call, or by phone — to understand your requirements and walk you through our current portfolio.",
  },
  {
    q: "Do you work with diaspora buyers purchasing from abroad?",
    a: "Absolutely. A significant proportion of our buyers are Nigerians based in the UK, USA, Canada, and across Europe. We have structured processes for remote purchasers, including digital signing, video viewings, and dedicated diaspora advisors who understand the specific considerations of cross-border transactions.",
  },
  {
    q: "Can I visit a show apartment before committing?",
    a: "Yes. We maintain fully furnished show apartments or show homes at all active developments. We encourage all prospective buyers to visit — experiencing the quality and scale of our homes in person is one of the most powerful ways to understand the Akon Homes difference.",
  },
  {
    q: "What is the typical timeline from enquiry to key handover?",
    a: "This varies depending on the development stage at the time of purchase. Off-plan purchases may complete in 12–24 months; near-complete developments can achieve key handover within 3–6 months of exchange. Your sales advisor will provide a precise timeline specific to your chosen development.",
  },
  {
    q: "Do you offer after-sales support and property management?",
    a: "Yes. Our client relationship team remains available after handover for any defects or queries during the liability period. We also offer an optional full property management service for investors — covering tenant sourcing, rent collection, and ongoing maintenance.",
  },
];

const officeGallery = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=900&q=85&auto=format&fit=crop",
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border-b border-white/[0.06]"
      data-testid={`contact-faq-${index}`}
    >
      <button className="w-full flex items-start justify-between gap-4 py-6 text-left group" onClick={() => setOpen(!open)}>
        <span className="font-serif text-lg text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 mt-1">
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

export default function Contact() {
  const [galleryOpen, setGalleryOpen] = useState<number | null>(null);

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,164,107,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/"><span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><Home className="w-3 h-3" />Home</span></Link>
            <span className="text-white/20">/</span>
            <span className="text-primary">Contact</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-5 font-medium">Get in Touch</p>
              <h1 className="font-serif text-6xl md:text-8xl text-foreground leading-[0.92]">
                Let's<br /><span className="text-primary italic">Talk</span>
              </h1>
            </div>
            <div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Whether you are taking your first step or finalising a significant investment, our team is ready to support you — fully, professionally, and at your pace.
              </p>
              <a
                href="https://wa.me/2341700880"
                target="_blank"
                rel="noreferrer"
                data-testid="link-whatsapp-hero"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-emerald-600/40 bg-emerald-900/20 text-emerald-300 text-sm font-medium hover:bg-emerald-900/40 hover:border-emerald-500/60 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Chat with us on WhatsApp — we reply fast
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────────────────────── */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <InquiryForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-3xl text-foreground mb-8">Contact Information</h2>
            {[
              { icon: Phone, label: "Lagos (Main)", value: "+234 (0) 1 700 8800" },
              { icon: Phone, label: "London", value: "+44 (0) 20 7123 4567" },
              { icon: Mail, label: "General Enquiries", value: "info@akonhomes.com" },
              { icon: Mail, label: "Investor Relations", value: "invest@akonhomes.com" },
              { icon: Clock, label: "Lagos Office Hours", value: "Mon – Fri · 8am – 6pm WAT" },
              { icon: Clock, label: "London Office Hours", value: "Mon – Fri · 9am – 5pm GMT" },
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-white/[0.06] last:border-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">{label}</p>
                  <p className="text-foreground text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}

            <div className="mt-8 p-6 rounded-2xl bg-emerald-900/15 border border-emerald-700/30">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <h4 className="text-emerald-300 font-medium">WhatsApp</h4>
              </div>
              <p className="text-muted-foreground text-sm mb-4">Our Lagos sales team typically responds within 15 minutes during office hours.</p>
              <a href="https://wa.me/2341700880" target="_blank" rel="noreferrer" data-testid="link-whatsapp-inline" className="text-emerald-300 text-sm hover:text-emerald-200 transition-colors underline underline-offset-2">
                +234 (0) 1 700 8800 — Start chat
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OFFICES ──────────────────────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] bg-card/30" data-testid="section-offices">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Where to Find Us</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-foreground">Our Offices</motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group rounded-3xl overflow-hidden bg-background border transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl ${office.highlight ? "border-primary/40 shadow-lg shadow-primary/10" : "border-white/[0.08] hover:border-primary/30"}`}
                data-testid={`office-${i}`}
              >
                {office.highlight && (
                  <div className="bg-primary text-primary-foreground text-xs font-medium text-center py-2 tracking-wide uppercase">
                    Main Office
                  </div>
                )}
                <div className="relative aspect-video overflow-hidden">
                  <img src={office.image} alt={office.city} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-2xl text-white">{office.city}</h3>
                    <p className="text-white/70 text-sm">{office.country}</p>
                  </div>
                </div>
                <div className="p-6 space-y-3 text-sm">
                  <div className="flex gap-3 text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    <span>{office.phone}</span>
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">{office.email}</a>
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STYLISED MAP ─────────────────────────────────────────────── */}
      <section className="py-32" data-testid="section-map">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Global Presence</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-serif text-4xl md:text-5xl text-foreground">Where We Are</motion.h2>
          </div>

          {/* Desktop: stylised map visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="hidden md:block rounded-3xl overflow-hidden border border-white/[0.08] relative"
            style={{ aspectRatio: "21/8" }}
          >
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 35% 55%, rgba(200,164,107,0.06) 0%, transparent 60%), #0d1820" }}>
              <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="cmap" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="1" cy="1" r="0.8" fill="#C8A46B" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#cmap)" />
              </svg>
            </div>

            {[
              { label: "Lagos", sub: "Main Office", x: "27%", y: "58%" },
              { label: "Abuja", sub: "Sales Office", x: "34%", y: "48%" },
              { label: "Port Harcourt", sub: "Sales Office", x: "33%", y: "62%" },
              { label: "London", sub: "UK Office", x: "43%", y: "22%" },
            ].map((pin, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                className="absolute"
                style={{ left: pin.x, top: pin.y, transform: "translate(-50%, -100%)" }}
              >
                <div className="flex flex-col items-center">
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }} className="absolute w-5 h-5 rounded-full border-2 border-primary" style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg shadow-primary/50 z-10" />
                  <div className="mt-2 px-3 py-2 rounded-xl backdrop-blur-sm border border-white/[0.1] text-center" style={{ background: "rgba(15,23,32,0.88)" }}>
                    <p className="text-foreground text-xs font-medium whitespace-nowrap">{pin.label}</p>
                    <p className="text-muted-foreground text-[10px]">{pin.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="absolute bottom-4 right-4 px-4 py-3 rounded-xl border border-white/[0.08] backdrop-blur-sm" style={{ background: "rgba(15,23,32,0.85)" }}>
              <p className="text-muted-foreground text-xs mb-2">Office Locations</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                4 Offices Across 2 Countries
              </div>
            </div>
          </motion.div>

          {/* Mobile: location cards grid */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Lagos", sub: "Main Office", note: "Headquarters" },
              { label: "Abuja", sub: "Sales Office", note: "Capital Territory" },
              { label: "Port Harcourt", sub: "Sales Office", note: "South South" },
              { label: "London", sub: "UK Office", note: "Marylebone, W1" },
            ].map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-card border border-white/[0.08] p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute w-5 h-5 rounded-full border border-primary"
                  />
                  <div className="w-3 h-3 rounded-full bg-primary shadow-md shadow-primary/50" />
                </div>
                <div>
                  <p className="text-foreground font-serif text-lg leading-none">{loc.label}</p>
                  <p className="text-primary text-xs mt-1">{loc.sub}</p>
                  <p className="text-muted-foreground text-xs">{loc.note}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICE GALLERY ───────────────────────────────────────────── */}
      <section className="pb-32 border-b border-white/[0.06]" data-testid="section-office-gallery">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="font-serif text-3xl text-foreground">Inside Our Offices</motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {officeGallery.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${i === 0 ? "md:col-span-2 aspect-video" : "aspect-square"}`}
                onClick={() => setGalleryOpen(i)}
                data-testid={`office-gallery-${i}`}
              >
                <img src={src} alt={`Office ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery lightbox */}
        <AnimatePresence>
          {galleryOpen !== null && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" data-testid="gallery-lightbox">
              <div className="absolute inset-0 bg-background/92 backdrop-blur-2xl" onClick={() => setGalleryOpen(null)} />
              <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }} className="relative max-w-4xl w-full rounded-3xl overflow-hidden">
                <img src={officeGallery[galleryOpen]} alt="" className="w-full max-h-[80vh] object-contain" />
                <button onClick={() => setGalleryOpen(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white hover:text-primary transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-32" data-testid="section-faq">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12">
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">We're Here to Help</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-foreground">Common Questions</motion.h2>
          </div>
          {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-12 rounded-3xl bg-card/50 border border-white/[0.06] p-8 text-center">
            <p className="text-foreground font-medium mb-2">Didn't find your answer?</p>
            <p className="text-muted-foreground text-sm mb-6">Our team is available to answer any question — no matter how specific.</p>
            <a href="mailto:info@akonhomes.com" className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
              Email info@akonhomes.com <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
