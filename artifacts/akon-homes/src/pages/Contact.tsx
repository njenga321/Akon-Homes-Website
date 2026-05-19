import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import InquiryForm from "@/components/InquiryForm";

const offices = [
  {
    city: "Lagos",
    country: "Nigeria",
    address: "3 Sanusi Fafunwa Street, Victoria Island, Lagos 101001",
    phone: "+234 (0) 1 700 8800",
    email: "lagos@akonhomes.com",
    hours: "Mon – Fri: 8am – 6pm (WAT)",
  },
  {
    city: "Abuja",
    country: "Nigeria",
    address: "Plot 1234 Ahmadu Bello Way, Maitama, Abuja 900271",
    phone: "+234 (0) 9 876 5432",
    email: "abuja@akonhomes.com",
    hours: "Mon – Fri: 8am – 6pm (WAT)",
  },
  {
    city: "London",
    country: "United Kingdom",
    address: "10 Portman Square, Marylebone, London W1H 6AZ",
    phone: "+44 (0) 20 7123 4567",
    email: "london@akonhomes.com",
    hours: "Mon – Fri: 9am – 5pm (GMT)",
  },
];

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,164,107,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs tracking-[0.25em] uppercase text-primary mb-6 font-medium">
              Get in Touch
            </p>
            <h1 className="font-serif text-6xl md:text-8xl text-foreground leading-tight mb-6">
              Let's
              <br />
              <span className="text-primary italic">Talk</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Whether you are purchasing your first Akon home or managing a portfolio of investments, our advisory team is ready to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Offices */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <InquiryForm />
          </motion.div>

          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-serif text-3xl text-foreground mb-8">Our Offices</h2>
            <div className="space-y-6">
              {offices.map((office, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-card border border-white/[0.08] p-8"
                  data-testid={`card-office-${i}`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <h3 className="font-serif text-xl text-foreground">{office.city}</h3>
                      <p className="text-muted-foreground text-sm">{office.country}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
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
                      <a
                        href={`mailto:${office.email}`}
                        className="hover:text-primary transition-colors"
                        data-testid={`link-email-${i}`}
                      >
                        {office.email}
                      </a>
                    </div>
                    <div className="flex gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="rounded-3xl overflow-hidden border border-white/[0.08] relative"
            style={{ aspectRatio: "21/6" }}
            data-testid="map-placeholder"
          >
            <div className="absolute inset-0 bg-card flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-serif text-xl text-foreground mb-1">Three Offices, One Standard</p>
                <p className="text-muted-foreground text-sm">Lagos · Abuja · London</p>
              </div>
            </div>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 50%, #C8A46B 1px, transparent 1px), radial-gradient(circle at 75% 50%, #C8A46B 1px, transparent 1px), radial-gradient(circle at 50% 50%, #C8A46B 1px, transparent 1px)`,
                backgroundSize: "100% 100%, 100% 100%, 100% 100%",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
