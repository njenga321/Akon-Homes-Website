import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Award,
  Globe,
  Heart,
  Layers,
  Lightbulb,
  Shield,
  CheckCircle2,
  Home,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { stats } from "@/data/stats";

// ── Data ─────────────────────────────────────────────────────────────────

const milestones = [
  {
    year: "2010",
    title: "Foundation",
    description:
      "Akon Homes was established in Lagos with a singular conviction: that Nigeria deserved world-class residential architecture built with genuine intention. Our first development — twelve apartments on Victoria Island — sold out before completion.",
  },
  {
    year: "2013",
    title: "First Award",
    description:
      "Recognised by the Nigerian Institute of Architects for design excellence on our Ikoyi townhouse development — the first of fourteen industry awards we would receive over the following decade.",
  },
  {
    year: "2015",
    title: "Abuja Expansion",
    description:
      "The success of our Lagos portfolio brought us to the capital, where demand for quality housing in the diplomatic corridors was entirely unmet. Ashbourne Court became our landmark Abuja offering.",
  },
  {
    year: "2018",
    title: "International Reach",
    description:
      "A joint venture with a London-based architectural studio brought Akon Homes to the UK market. The Crestline Tower became our first international development — sold out within six months of launch.",
  },
  {
    year: "2020",
    title: "Sustainability Charter",
    description:
      "We formalised our commitment to sustainable construction — embedding passive design principles, renewable energy targets, and responsible materials sourcing into every new development brief.",
  },
  {
    year: "2022",
    title: "850 Homes Milestone",
    description:
      "A significant milestone: 850 homes delivered across Nigeria and the UK, with an active pipeline spanning Port Harcourt, Abuja, Lagos, and London.",
  },
  {
    year: "2025",
    title: "A New Chapter",
    description:
      "Today, Akon Homes manages a development pipeline exceeding $1.4 billion, with projects in six countries and a team of 280 professionals committed to the founding standard.",
  },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    desc: "We say what we will do, and we do what we say. Our reputation is our most valuable asset — it is earned on every project.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We challenge conventions in design, construction, and experience. The best answer is rarely the most familiar one.",
  },
  {
    icon: Heart,
    title: "Care",
    desc: "We build homes, not units. Every decision we make is filtered through the question: how does this serve the person who will live here?",
  },
  {
    icon: Globe,
    title: "Ambition",
    desc: "We build in the world's most competitive markets and hold ourselves to the standards set by the very best — wherever they are.",
  },
  {
    icon: Layers,
    title: "Craft",
    desc: "We believe in the supremacy of materials, the importance of detail, and the irreplaceable value of genuine craftsmanship.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Mediocrity is never an option. We pursue the best outcome on every project — however long it takes, however much it costs.",
  },
];

const team = [
  {
    name: "Akinwale Babatunde",
    title: "Founder & Chief Executive",
    bio: "A visionary who founded Akon Homes with a single conviction: that Nigeria deserved world-class homes. Over 25 years in real estate across three continents.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Chidinma Eze",
    title: "Creative Director",
    bio: "Trained at the Architectural Association, London. Leads our design philosophy and is the creative force behind our most celebrated projects.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Emeka Nwosu",
    title: "Director of Sales",
    bio: "15 years leading premium property sales across Nigeria and the UK diaspora market. Expert in structuring complex cross-border transactions.",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Dr. Kemi Adeyemi",
    title: "Head of Sustainability",
    bio: "Holds a doctorate in sustainable urban design from UCL. Leads Akon Homes' environmental strategy and our industry-leading green charter.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Adebola Okonkwo",
    title: "Head of Research",
    bio: "Former Goldman Sachs analyst. Provides the market intelligence that underpins Akon Homes' site acquisition and investment strategy.",
    image: "https://images.unsplash.com/photo-1583692331507-fc0bd348695d?w=600&q=85&auto=format&fit=crop",
  },
  {
    name: "Ngozi Okafor",
    title: "Client Relations Director",
    bio: "Ensures every Akon Homes buyer receives a seamlessly managed journey from first enquiry to key handover and beyond.",
    image: "https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=600&q=85&auto=format&fit=crop",
  },
];

const awards = [
  { year: "2024", title: "Best Luxury Developer", body: "Africa Property Awards" },
  { year: "2023", title: "Sustainable Design of the Year", body: "BuildNigeria Excellence Awards" },
  { year: "2022", title: "Best Mixed-Use Development", body: "West Africa Real Estate Forum" },
  { year: "2021", title: "Developer of the Year", body: "Nigerian Institute of Architects" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function About() {
  return (
    <div>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end pb-24 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85&auto=format&fit=crop"
            alt="Akon Homes architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-6 pt-40">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/"><span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><Home className="w-3 h-3" />Home</span></Link>
            <span className="text-white/20">/</span>
            <span className="text-primary">About</span>
          </nav>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs tracking-[0.3em] uppercase text-primary mb-5 font-medium"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-6xl md:text-8xl text-foreground leading-[0.92] mb-6"
          >
            Built on<br />
            <span className="text-primary italic">Conviction</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-muted-foreground text-xl max-w-2xl leading-relaxed"
          >
            For over a decade, Akon Homes has operated on one belief: that the people of Nigeria deserve the finest residential architecture the world can produce — designed and built here, for them.
          </motion.p>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => <AnimatedCounter key={i} stat={stat} index={i} />)}
        </div>
      </section>

      {/* ── COMPANY STORY ─────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-5 font-medium">The Beginning</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-4">
              The standard we set is simple:<br />
              <span className="text-primary italic">would we live here?</span>
            </h2>
            <div className="w-16 h-px bg-primary mb-8" />
            <p className="text-muted-foreground leading-[1.9] mb-5">
              When founder Akinwale Babatunde established Akon Homes in 2010, the ambition was straightforward: build homes of a quality that the Nigerian market had never seen. Not imitations of international luxury, but a genuinely Nigerian luxury vernacular — rooted in local craft, responsive to local climate, and proud of its context.
            </p>
            <p className="text-muted-foreground leading-[1.9] mb-5">
              Fifteen years later, that philosophy has shaped every development we have completed. Our architecture references the geometric richness of Nigerian textile traditions. Our interiors incorporate emerging local artists alongside pieces from the finest European studios.
            </p>
            <p className="text-muted-foreground leading-[1.9] mb-10">
              We have expanded to six countries, but our heart remains in Lagos. Every development we undertake — wherever it is in the world — is built to the same standard: one that would make our first homeowners proud.
            </p>
            <Link href="/developments">
              <button className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">
                View our portfolio
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&q=85&auto=format&fit=crop"
                alt="Akon Homes craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 rounded-2xl px-6 py-5 border border-white/[0.08] shadow-2xl"
              style={{ background: "rgba(15,23,32,0.92)", backdropFilter: "blur(16px)" }}
            >
              <p className="font-serif text-3xl text-primary mb-1">15+</p>
              <p className="text-muted-foreground text-sm">Years building without compromise</p>
            </div>
            <div className="absolute -top-6 -right-6 grid grid-cols-2 gap-2">
              {awards.slice(0, 2).map((a, i) => (
                <div key={i} className="rounded-xl px-4 py-3 border border-white/[0.08] text-center" style={{ background: "rgba(15,23,32,0.92)", backdropFilter: "blur(12px)" }}>
                  <Award className="w-4 h-4 text-primary mx-auto mb-1" />
                  <p className="text-foreground text-xs font-medium leading-tight">{a.title}</p>
                  <p className="text-muted-foreground text-[10px]">{a.year}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                eyebrow: "Mission",
                title: "To deliver homes of enduring quality that enrich the lives of those who live in them.",
                body: "We believe architecture has the power to shape human experience — to create comfort, aspiration, community, and joy. Every decision we make is in service of that belief.",
                img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&auto=format&fit=crop",
              },
              {
                eyebrow: "Vision",
                title: "To become Africa's most admired real estate developer — and a global benchmark for quality.",
                body: "We measure ourselves not against our competitors, but against the very best developers in the world. That is the ambition that drives every project we take on.",
                img: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=80&auto=format&fit=crop",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-3xl overflow-hidden bg-background border border-white/[0.08] hover:border-primary/30 transition-all duration-500"
                data-testid={`card-mv-${i}`}
              >
                <div className="aspect-video overflow-hidden">
                  <img src={card.img} alt={card.eyebrow} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-8">
                  <p className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">{card.eyebrow}</p>
                  <h3 className="font-serif text-2xl text-foreground leading-snug mb-4">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">What We Stand For</motion.p>
            <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-foreground leading-tight max-w-xl">Our Core Values</motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-3xl border border-white/[0.08] p-8 relative overflow-hidden hover:border-primary/35 hover:-translate-y-1.5 transition-all duration-500"
                  style={{ background: "rgba(22,31,44,0.6)", backdropFilter: "blur(12px)" }}
                  data-testid={`card-value-${i}`}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(200,164,107,0.1) 0%, transparent 70%)" }} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURAL PHILOSOPHY ──────────────────────────────────── */}
      <section className="py-32 border-y border-white/[0.06] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3"
            >
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-5 font-medium">Design</p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
                Architectural Philosophy
              </h2>
              <div className="w-16 h-px bg-primary mb-8" />
              <p className="text-muted-foreground leading-[1.9] text-lg mb-6">
                We begin every project with a question that sounds simple but proves profoundly difficult to answer: what does it mean to build something worthy of this place, this time, these people?
              </p>
              <p className="text-muted-foreground leading-[1.9] mb-6">
                The easy answer is to import European or American luxury vernacular wholesale. We refuse that shortcut. Our buildings are designed to be legible as products of their time and place — rooted in local tradition, responsive to local climate, and carrying the confidence of a culture at its most assured.
              </p>
              <p className="text-muted-foreground leading-[1.9] mb-10">
                Passive design drives every project — orientation, massing, and facade treatment are tuned to maximise natural ventilation and light. Materials are selected for their performance over decades, not just their appearance at handover. Art and craft are integral to the building programme, not decorative afterthoughts.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {["Context-responsive design", "Passive climate strategy", "Local craft integration", "Art programme", "Durable materials", "10-year structural warranty"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="rounded-3xl overflow-hidden aspect-[3/4]">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=700&q=85&auto=format&fit=crop" alt="Interior design" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-3xl overflow-hidden aspect-video">
                <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=700&q=85&auto=format&fit=crop" alt="Architecture detail" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP TEAM ───────────────────────────────────────────── */}
      <section className="py-32 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Our People</motion.p>
            <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Leadership Team</motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-3xl overflow-hidden bg-background border border-white/[0.08] hover:border-primary/30 transition-all duration-500"
                data-testid={`card-team-${i}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Hover overlay with bio */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONES ────────────────────────────────────────────────── */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="text-xs tracking-[0.25em] uppercase text-primary mb-4 font-medium">Our History</motion.p>
            <motion.h2 {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Milestones That Shaped Us</motion.h2>
          </div>

          <div className="relative">
            <div className="absolute left-[5.5rem] top-0 bottom-0 w-px bg-white/[0.06] hidden md:block" />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-8 md:gap-12 items-start py-8 border-b border-white/[0.04] last:border-0 group"
                  data-testid={`milestone-${i}`}
                >
                  <div className="shrink-0 w-20 text-right pt-1">
                    <span className="font-serif text-2xl text-primary">{m.year}</span>
                  </div>
                  <div className="relative flex-1 md:pl-10">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background hidden md:block group-hover:scale-125 transition-transform duration-300 shadow-md shadow-primary/50" />
                    <h4 className="text-foreground font-serif text-xl mb-2 group-hover:text-primary transition-colors duration-300">{m.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{m.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AWARDS ────────────────────────────────────────────────────── */}
      <section className="py-24 border-y border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-6 md:gap-12 justify-between">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-primary mb-2 font-medium">Recognition</p>
              <h2 className="font-serif text-3xl text-foreground">Industry Awards</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {awards.map((a, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl bg-background border border-white/[0.08] p-5 text-center hover:border-primary/30 transition-all duration-300"
                  data-testid={`award-${i}`}
                >
                  <Award className="w-5 h-5 text-primary mx-auto mb-3" />
                  <p className="text-foreground text-sm font-medium leading-tight mb-1">{a.title}</p>
                  <p className="text-muted-foreground text-xs">{a.body}</p>
                  <p className="text-primary/60 text-xs mt-1">{a.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,164,107,0.1) 0%, transparent 70%)" }} />
        <motion.div {...fadeUp} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">Join the Journey</p>
          <h2 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-tight">
            Build something that<br /><span className="text-primary italic">lasts forever.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Whether you are a future homeowner, an investor, or a potential partner — we would love to explore what we might create together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/25">
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/developments">
              <button className="inline-flex items-center gap-2 px-9 py-4 rounded-full border border-white/20 text-foreground font-medium text-sm hover:border-primary/50 hover:text-primary transition-all duration-300">
                View Developments
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
