import { cn } from '@/lib/utils';

const backgroundStyles = {
  white: 'bg-white',
  cream: 'bg-cream',
  navy:  'bg-navy text-white',
  coral: 'bg-coral text-white',
} as const;

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: keyof typeof backgroundStyles;
  as?: 'section' | 'div' | 'article';
  tight?: boolean;
}

export function Section({
  className,
  background = 'white',
  as: Tag = 'section',
  tight = false,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        tight ? 'py-12 md:py-16 lg:py-20' : 'py-16 md:py-24 lg:py-32',
        backgroundStyles[background],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Eyebrow label above section headlines */
export function SectionEyebrow({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'eyebrow text-coral mb-3',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

/** Standard section headline */
export function SectionHeadline({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

/** Supporting paragraph under a section headline */
export function SectionSubtext({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-lg text-gray-500 leading-relaxed max-w-2xl', className)}
      {...props}
    >
      {children}
    </p>
  );
}
