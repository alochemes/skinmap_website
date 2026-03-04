import { cn } from '@/lib/utils';

const variantStyles = {
  // bright green bg — dark text required (white gives only 2.1:1 contrast on #00CA5A)
  new:      'bg-coral text-navy-900',
  // sky-blue bg — same contrast problem, use dark text
  clinical: 'bg-blue/15 text-blue-700 border border-blue/30',
  partner:  'bg-navy text-white',
  press:    'bg-gray-100 text-gray-700',
  outline:  'border border-navy-200 text-navy bg-transparent',
} as const;

const sizeStyles = {
  sm: 'text-2xs px-2 py-0.5 tracking-wider',
  md: 'text-xs px-3 py-1 tracking-widest',
} as const;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
}

export function Badge({
  className,
  variant = 'clinical',
  size = 'md',
  children,
  ...props
}: BadgeProps & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase rounded-full',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
