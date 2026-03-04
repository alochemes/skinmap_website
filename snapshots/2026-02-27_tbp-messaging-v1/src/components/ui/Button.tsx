'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const variantStyles = {
  primary:
    'bg-coral text-white hover:bg-coral-dark active:bg-coral-dark focus-visible:ring-coral shadow-sm',
  secondary:
    'bg-navy text-white hover:bg-navy-700 active:bg-navy-800 focus-visible:ring-navy shadow-sm',
  outline:
    'border-2 border-navy text-navy bg-transparent hover:bg-navy hover:text-white active:bg-navy-800 focus-visible:ring-navy',
  ghost:
    'text-navy bg-transparent hover:bg-navy-50 active:bg-navy-100 focus-visible:ring-navy',
  'outline-white':
    'border-2 border-white text-white bg-transparent hover:bg-white hover:text-navy active:bg-gray-100 focus-visible:ring-white',
} as const;

const sizeStyles = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-base gap-2',
  lg: 'h-14 px-8 text-lg gap-2.5',
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1 }}
        className={cn(
          // Base
          'inline-flex items-center justify-center font-semibold rounded-full',
          'transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          'select-none cursor-pointer',
          // Variant + size
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading && <Loader2 className="animate-spin shrink-0" size={16} />}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
