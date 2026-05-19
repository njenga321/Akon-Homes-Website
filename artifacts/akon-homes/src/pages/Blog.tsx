import { useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/data/blog";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

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
              Perspectives
            </p>
            <h1 className="font-serif text-6xl md:text-8xl text-foreground leading-tight mb-6">
              The
              <br />
              <span className="text-primary italic">Journal</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
              Insight on luxury real estate, design philosophy, market intelligence, and the future of African urbanism.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-2" data-testid="filter-category">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-cat-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/60 border border-white/[0.08] text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured + Grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length > 0 && (
            <>
              {/* Featured post */}
              {activeCategory === "All" && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-10"
                >
                  <a href={`/blog/${filtered[0].slug}`} data-testid={`card-blog-featured-${filtered[0].slug}`}>
                    <div className="group cursor-pointer rounded-3xl overflow-hidden bg-card border border-white/[0.08] transition-all duration-500 hover:border-primary/30 grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                        <img
                          src={filtered[0].image}
                          alt={filtered[0].title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground">
                          {filtered[0].category}
                        </span>
                      </div>
                      <div className="p-10 flex flex-col justify-center">
                        <p className="text-muted-foreground text-xs mb-4">{filtered[0].date} · {filtered[0].readTime}</p>
                        <h2 className="font-serif text-3xl text-foreground mb-4 leading-snug group-hover:text-primary transition-colors duration-300">
                          {filtered[0].title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {filtered[0].excerpt}
                        </p>
                        <p className="text-foreground text-sm font-medium">{filtered[0].author}</p>
                        <p className="text-muted-foreground text-xs">{filtered[0].authorTitle}</p>
                      </div>
                    </div>
                  </a>
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(activeCategory === "All" ? filtered.slice(1) : filtered).map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-foreground mb-3">No articles in this category</p>
              <p className="text-muted-foreground text-sm">Check back soon for new content.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Stay Informed"
        title={"Market insight,\ndelivered to you"}
        subtitle="Subscribe to the Akon Homes journal for quarterly market reports, design features, and exclusive development previews."
        primaryLabel="View Our Developments"
        primaryHref="/developments"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </div>
  );
}
