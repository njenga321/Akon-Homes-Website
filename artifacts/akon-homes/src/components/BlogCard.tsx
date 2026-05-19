import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/blog/${post.slug}`} data-testid={`card-blog-${post.slug}`}>
        <div className="group cursor-pointer rounded-3xl overflow-hidden bg-card border border-white/[0.08] h-full transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-black/40">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 text-xs tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {post.category}
            </span>
          </div>

          <div className="p-6 flex flex-col flex-1">
            <h3 className="font-serif text-xl text-foreground mb-3 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-3">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.06]">
              <div>
                <p className="text-foreground text-sm font-medium">{post.author}</p>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs mt-0.5">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                  <span className="mx-1">·</span>
                  <span>{post.date}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
