import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Search, ArrowRight, Clock, Home, X } from "lucide-react";
import { blogPosts } from "@/data/blog";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const q = query.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, query]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div>
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(200,164,107,0.08) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link href="/"><span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><Home className="w-3 h-3" />Home</span></Link>
            <span className="text-white/20">/</span>
            <span className="text-primary">Journal</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end"
          >
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-primary mb-5 font-medium">Perspectives</p>
              <h1 className="font-serif text-6xl md:text-8xl text-foreground leading-[0.92]">
                The<br /><span className="text-primary italic">Journal</span>
              </h1>
            </div>
            <div>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Insight on luxury real estate, design philosophy, market intelligence, and the future of African urbanism — from the people building it.
              </p>
              {/* Search */}
              <div className="relative" data-testid="search-bar">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  data-testid="input-search"
                  className="w-full pl-11 pr-10 py-3.5 rounded-full bg-card border border-white/[0.08] text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ───────────────────────────────────────── */}
      <section className="pb-10 sticky top-[72px] z-10 bg-background/90 backdrop-blur-xl border-b border-white/[0.06] py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" data-testid="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-card/60 border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            <span className="text-foreground font-medium">{filtered.length}</span> article{filtered.length !== 1 ? "s" : ""}
            {query && <span className="text-primary"> matching "{query}"</span>}
          </span>
        </div>
      </section>

      {/* ── CONTENT ────────────────────────────────────────────────── */}
      <section className="py-16 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-32"
                data-testid="empty-state"
              >
                <p className="font-serif text-2xl text-foreground mb-3">No articles found</p>
                <p className="text-muted-foreground mb-6">Try a different search term or category.</p>
                <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm">Reset filters</button>
              </motion.div>
            ) : (
              <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Featured hero */}
                {featured && activeCategory === "All" && !query && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                    data-testid="featured-article"
                  >
                    <Link href={`/blog/${featured.slug}`}>
                      <div className="group cursor-pointer rounded-3xl overflow-hidden bg-card border border-white/[0.08] hover:border-primary/30 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2 hover:shadow-2xl hover:shadow-black/40">
                        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
                          <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                          <div className="absolute top-5 left-5 flex gap-2">
                            <span className="text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground">Featured</span>
                            <span className="text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/10">{featured.category}</span>
                          </div>
                        </div>
                        <div className="p-10 md:p-14 flex flex-col justify-center">
                          <div className="flex items-center gap-3 text-muted-foreground text-xs mb-5">
                            <Clock className="w-3.5 h-3.5" />
                            {featured.readTime}
                            <span>·</span>
                            {featured.date}
                          </div>
                          <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-snug mb-5 group-hover:text-primary transition-colors duration-300">
                            {featured.title}
                          </h2>
                          <p className="text-muted-foreground leading-relaxed mb-7 text-sm line-clamp-3">{featured.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-foreground text-sm font-medium">{featured.author}</p>
                              <p className="text-muted-foreground text-xs">{featured.authorTitle}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* Article grid */}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(activeCategory === "All" && !query ? rest : filtered).map((post, i) => (
                      <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        data-testid={`card-blog-${post.slug}`}
                      >
                        <Link href={`/blog/${post.slug}`}>
                          <div className="group cursor-pointer rounded-3xl overflow-hidden bg-card border border-white/[0.08] h-full hover:border-primary/30 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1.5 transition-all duration-500">
                            <div className="relative aspect-video overflow-hidden">
                              <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                              <span className="absolute top-4 left-4 text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground">{post.category}</span>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-3">
                                <Clock className="w-3 h-3" />
                                {post.readTime} · {post.date}
                              </div>
                              <h3 className="font-serif text-xl text-foreground leading-snug mb-3 group-hover:text-primary transition-colors duration-300 line-clamp-2">{post.title}</h3>
                              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-5">{post.excerpt}</p>
                              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                                <div>
                                  <p className="text-foreground text-sm font-medium">{post.author}</p>
                                  <p className="text-muted-foreground text-xs">{post.authorTitle}</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* If only one result (featured) */}
                {activeCategory === "All" && !query && filtered.length === 1 && (
                  <p className="text-center text-muted-foreground text-sm mt-8">More articles coming soon.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
