'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

const variantStyles = {
  feature:     'bg-white shadow-card hover:shadow-card-hover border border-gray-100',
  stat:        'bg-navy text-white',
  testimonial: 'bg-cream',
  team:        'bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1',
  plain:       'bg-white',
} as const;

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof variantStyles;
  animate?: boolean;
}

export function Card({
  className,
  variant = 'feature',
  animate = true,
  children,
  ...props
}: CardProps) {
  const reduced = useReducedMotion();
  const classes = cn(
    'rounded-2xl p-6 transition-all duration-300',
    variantStyles[variant],
    className
  );

  if (animate) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={classes} {...props}>
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

/** Convenience sub-components */
export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('font-bold text-lg leading-snug mb-2', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-gray-500 leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}
