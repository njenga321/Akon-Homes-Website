import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import AnimatedCounter from "@/components/AnimatedCounter";
import Timeline from "@/components/Timeline";
import CTASection from "@/components/CTASection";
import { stats } from "@/data/stats";

const milestones = [
  {
    year: "2012",
    title: "Foundation",
    description:
      "Akon Homes was founded in Lagos with a single conviction: that Nigeria deserved world-class residential architecture. Our first development — twelve apartments on Victoria Island — sold out in three weeks.",
  },
  {
    year: "2015",
    title: "Expansion to Abuja",
    description:
      "The success of our Lagos portfolio brought us to the capital, where demand for quality housing in the diplomatic corridors was entirely unmet. Ashbourne Court became our flagship Abuja offering.",
  },
  {
    year: "2018",
    title: "International Reach",
    description:
      "A landmark joint venture with a London-based architectural studio brought Akon Homes to the UK market, completing The Crestline Tower in Central London — our first international development.",
  },
  {
    year: "2020",
    title: "Sustainability Charter",
    description:
      "We formalised our commitment to sustainable construction, embedding environmental targets into every new development brief — from passive design principles to materials sourcing and operational energy.",
  },
  {
    year: "2022",
    title: "2,000 Homes Milestone",
    description:
      "A significant milestone: 2,000 homes delivered across Nigeria and the United Kingdom, with a pipeline of developments underway in Port Harcourt, Abuja, and London.",
  },
  {
    year: "2025",
    title: "A New Chapter",
    description:
      "Today, Akon Homes manages an active development pipeline of over $1.4 billion, with projects across six countries and a team of 280 dedicated professionals committed to our founding standard.",
  },
];

const team = [
  {
    name: "Akinwale Babatunde",
    title: "Founder & Chief Executive",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&auto=format&fit=crop&faces=1",
  },
  {
    name: "Chidinma Eze",
    title: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=85&auto=format&fit=crop&faces=1",
  },
  {
    name: "Emeka Nwosu",
    title: "Director of Sales",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&auto=format&fit=crop&faces=1",
  },
  {
    name: "Dr. Kemi Adeyemi",
    title: "Head of Sustainability",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=85&auto=format&fit=crop&faces=1",
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,164,107,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
              Our Story
            </p>
            <h1 className="font-serif text-6xl md:text-8xl text-foreground leading-tight mb-8">
              Built on
              <br />
              <span className="text-primary italic">Conviction</span>
            </h1>
            <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">
              For over a decade, Akon Homes has operated on a simple belief: that the people of Nigeria deserve the finest residential architecture the world can produce — designed and built here, for them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 border-y border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden aspect-[4/5]"
          >
            <img
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85&auto=format&fit=crop"
              alt="Akon Homes architecture"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-4xl text-foreground mb-6 leading-tight">
              The standard we set ourselves is simple: would we live here?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              When our founder Akinwale Babatunde established Akon Homes in 2012, the ambition was straightforward: build homes of a quality that the Nigerian market had never seen. Not imitations of international luxury, but a genuinely Nigerian luxury vernacular — rooted in local craft, responsive to local climate, and proud of its context.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Twelve years later, that philosophy has shaped every development we have completed. Our architecture references the geometric richness of Nigerian textile traditions. Our interiors incorporate the work of emerging local artists alongside pieces sourced from the finest European studios. Our buildings breathe — designed to maximise natural ventilation and minimise mechanical dependence.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We have expanded to six countries, but our heart remains in Lagos. Every development we undertake, wherever it is in the world, is built to the same standard: one that would make our first homeowners proud.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <AnimatedCounter key={i} stat={stat} index={i} />
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <SectionTitle
              eyebrow="Our History"
              title="Milestones That Shaped Us"
              subtitle="From a single development in Victoria Island to a global portfolio — a decade of building without compromise."
            />
          </div>
          <Timeline items={milestones} />
        </div>
      </section>

      {/* Team */}
      <section className="py-32 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <SectionTitle
              eyebrow="Leadership"
              title="The Team Behind the Vision"
              subtitle="A group of exceptional individuals united by a shared commitment to the highest standard."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group"
                data-testid={`card-team-${i}`}
              >
                <div className="rounded-3xl overflow-hidden aspect-[3/4] mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-1">{member.name}</h3>
                <p className="text-muted-foreground text-sm">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Partner with Us"
        title={"Build something that\nlasts forever"}
        subtitle="Whether you are an investor, an architect, or a future homeowner — we would love to explore what we might create together."
        primaryLabel="Get in Touch"
        primaryHref="/contact"
        secondaryLabel="View Our Work"
        secondaryHref="/developments"
      />
    </div>
  );
}
