import { useState } from "react";
import { Link } from "wouter";
import { Instagram, Linkedin, Twitter, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t border-white/[0.06] mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="font-serif text-2xl tracking-[0.2em] text-primary mb-5">
              AKON HOMES
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Crafting bespoke residential and mixed-use developments in the world's most compelling cities. Built to endure.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                data-testid="link-social-instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-background/60 border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                data-testid="link-social-linkedin"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-background/60 border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                data-testid="link-social-twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-full bg-background/60 border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base text-foreground mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-3">
              {[
                { href: "/developments", label: "All Developments" },
                { href: "/about", label: "About Us" },
                { href: "/blog", label: "Journal" },
                { href: "/contact", label: "Contact" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300 cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base text-foreground mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="block text-xs tracking-widest uppercase text-primary/70 mb-1">Lagos</span>
                +234 (0) 1 700 8800
              </li>
              <li>
                <span className="block text-xs tracking-widest uppercase text-primary/70 mb-1">London</span>
                +44 (0) 20 7123 4567
              </li>
              <li className="pt-2">
                <a
                  href="mailto:info@akonhomes.com"
                  data-testid="link-footer-email"
                  className="hover:text-primary transition-colors"
                >
                  info@akonhomes.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-base text-foreground mb-3 tracking-wide">Stay Informed</h4>
            <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
              Quarterly market reports and exclusive development previews.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-primary text-sm" data-testid="newsletter-success">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you for subscribing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2" data-testid="form-newsletter">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  data-testid="input-newsletter-email"
                  className="flex-1 min-w-0 px-4 py-2.5 rounded-full bg-background/60 border border-white/[0.08] text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  data-testid="button-newsletter-subscribe"
                  className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-accent transition-all duration-300 shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Akon Homes Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
