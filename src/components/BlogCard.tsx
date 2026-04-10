import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

export function BlogCard({ post, className = '' }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`group block bg-surface rounded-xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="aspect-[16/9] overflow-hidden bg-surface-alt">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://placehold.co/800x450/e2e8f0/94a3b8?text=Blog';
          }}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-muted mb-2">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        <span className="inline-block px-2 py-0.5 bg-primary-light text-primary text-xs font-medium rounded-md mb-2">
          {post.category}
        </span>
        <h3 className="font-semibold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-text-secondary line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
