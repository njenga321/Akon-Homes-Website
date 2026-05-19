import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Home,
  ChevronRight,
} from "lucide-react";
import { blogPosts } from "@/data/blog";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  // ── Reading progress ───────────────────────────────────────────────────
  const [progress, setProgress] = useState(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, -top);
      const total = height - windowH;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on slug change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);

  // ── Copy link ─────────────────────────────────────────────────────────
  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!post) {
    return (
      <div className="pt-40 pb-24 max-w-4xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl text-foreground mb-4">Article Not Found</h1>
        <Link href="/blog"><button className="inline-flex items-center gap-2 text-primary text-sm"><ArrowLeft className="w-4 h-4" />Back to Journal</button></Link>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div ref={articleRef}>
      {/* ── Reading Progress Bar ─────────────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-primary z-[60] origin-left"
        style={{ scaleX: progress / 100 }}
        data-testid="reading-progress"
      />

      {/* ── Back Nav ─────────────────────────────────────────────────── */}
      <div className="pt-32 pb-6 max-w-4xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/"><span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><Home className="w-3 h-3" />Home</span></Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog"><span className="hover:text-primary transition-colors cursor-pointer">Journal</span></Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary line-clamp-1">{post.title}</span>
        </nav>
      </div>

      {/* ── Article Header ───────────────────────────────────────────── */}
      <article className="max-w-4xl mx-auto px-6 pb-24">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-primary/15 text-primary border border-primary/30 mb-6">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
            {post.title}
          </h1>

          {/* Author + meta row */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm border-y border-white/[0.06] py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-serif text-sm font-medium">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-foreground font-medium">{post.author}</p>
                <p className="text-xs">{post.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</div>
            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</div>

            {/* Social share */}
            <div className="ml-auto flex items-center gap-2" data-testid="social-share">
              <span className="text-xs text-muted-foreground mr-1">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                data-testid="share-twitter"
                className="w-8 h-8 rounded-full bg-card border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                data-testid="share-linkedin"
                className="w-8 h-8 rounded-full bg-card border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={copyLink}
                data-testid="share-copy-link"
                className="w-8 h-8 rounded-full bg-card border border-white/[0.08] flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 relative"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </motion.span>
                  ) : (
                    <motion.span key="link" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                      <Link2 className="w-3.5 h-3.5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.header>

        {/* Hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden aspect-video mb-14"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          data-testid="blog-content"
        >
          {/* Lead paragraph */}
          <p className="font-serif text-2xl text-foreground/90 leading-relaxed mb-10 border-l-2 border-primary pl-6 italic">
            {post.excerpt}
          </p>

          {/* Body paragraphs */}
          <div className="space-y-6">
            {paragraphs.map((para, i) => (
              <p key={i} className="text-muted-foreground leading-[1.95] text-base md:text-[17px]">
                {para}
              </p>
            ))}
          </div>

          {/* Pull quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="my-14 pl-8 border-l-4 border-primary"
          >
            <p className="font-serif text-2xl text-foreground leading-relaxed italic">
              "We do not design to trends. We design to endure — and the difference is visible in every material choice, every spatial decision, every line."
            </p>
            <footer className="mt-4 text-muted-foreground text-sm">
              — {post.author}, {post.authorTitle}
            </footer>
          </motion.blockquote>

          {/* Additional content */}
          <div className="space-y-6">
            <p className="text-muted-foreground leading-[1.95] text-base md:text-[17px]">
              The implications of this philosophy extend far beyond aesthetics. A building designed with genuine care for its place and its inhabitants demands more of its developers — more time, more rigour, more willingness to reject the easy solution. But it also produces buildings that matter: that residents are proud of, that communities are enriched by, that cities are grateful for.
            </p>
            <p className="text-muted-foreground leading-[1.95] text-base md:text-[17px]">
              This is what motivates us. Not market share, not accolades — though we are proud of those we have received. It is the conviction that the built environment has the power to shape human experience for the better, and that we bear a responsibility to exercise that power wisely.
            </p>
          </div>
        </motion.div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-12 border-t border-white/[0.06]">
          {["Real Estate", post.category, "Nigeria", "Investment", "Luxury"].map((tag, i) => (
            <span key={i} className="px-4 py-1.5 rounded-full bg-card border border-white/[0.08] text-muted-foreground text-xs hover:border-primary/30 hover:text-foreground transition-all duration-300 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 rounded-3xl bg-card border border-white/[0.08] p-8 flex gap-6 items-start"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center text-primary font-serif text-2xl shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Written by</p>
            <h4 className="font-serif text-xl text-foreground mb-1">{post.author}</h4>
            <p className="text-muted-foreground text-sm mb-3">{post.authorTitle}</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A member of the Akon Homes leadership team, bringing deep expertise in their field to everything we publish in The Journal.
            </p>
          </div>
        </motion.div>
      </article>

      {/* ── Related Articles ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-white/[0.06] bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="font-serif text-3xl text-foreground">Further Reading</h2>
            <Link href="/blog"><button className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors">All Articles <ArrowRight className="w-4 h-4" /></button></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link href={`/blog/${p.slug}`}>
                  <div className="group cursor-pointer rounded-3xl overflow-hidden bg-background border border-white/[0.08] hover:border-primary/30 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-video overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-primary tracking-wide uppercase">{p.category}</span>
                      <h3 className="font-serif text-lg text-foreground mt-2 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">{p.title}</h3>
                      <p className="text-muted-foreground text-xs">{p.readTime} · {p.date}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ArrowRight({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}
