import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blog";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 text-center">
        <h1 className="font-serif text-4xl text-foreground mb-4">Article Not Found</h1>
        <Link href="/blog">
          <button className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </button>
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div>
      {/* Back */}
      <div className="pt-32 pb-8 max-w-4xl mx-auto px-6">
        <Link href="/blog" data-testid="link-back-blog">
          <button className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            The Journal
          </button>
        </Link>
      </div>

      {/* Header */}
      <article className="max-w-4xl mx-auto px-6 pb-24">
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="inline-block text-xs tracking-[0.2em] uppercase px-3 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 mb-6">
            {post.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm border-y border-white/[0.06] py-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-medium">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">{post.author}</p>
                <p className="text-xs">{post.authorTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </div>
          </div>
        </motion.header>

        {/* Cover image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden aspect-video mb-12"
        >
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="prose prose-invert max-w-none"
          data-testid="blog-content"
        >
          <p className="text-xl text-foreground/90 leading-relaxed mb-8 font-light">
            {post.excerpt}
          </p>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-[1.85] mb-6 text-base">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </article>

      {/* Related */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-foreground mb-12">Further Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
