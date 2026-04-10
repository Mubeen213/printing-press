import { Star } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className = '' }: TestimonialCardProps) {
  return (
    <div
      className={`bg-surface rounded-xl border border-border-light p-6 shadow-card flex flex-col ${className}`}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-border'}`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-sm text-text-secondary leading-relaxed flex-1 mb-4">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-border-light">
        <div className="w-10 h-10 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-sm text-text">{testimonial.name}</p>
          <p className="text-xs text-muted">
            {testimonial.role}
            {testimonial.company ? `, ${testimonial.company}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
