import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section
      className="min-h-screen flex items-center justify-center bg-navy pt-16 px-4"
      aria-label="Page not found"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-blue/10 blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-lg">
        <p className="text-coral text-8xl font-extrabold mb-4 tracking-tight">404</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Page not found
        </h1>
        <p className="text-gray-400 leading-relaxed mb-10">
          This page doesn&apos;t exist or has moved. Let&apos;s get you back to skinmap.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              <Home size={18} aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
          <Link href="/contact?type=demo">
            <Button variant="outline-white" size="lg">
              Request a Demo
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </Link>
        </div>
        <p className="mt-10 text-sm text-gray-500">
          Looking for something specific?{' '}
          <Link href="/contact" className="text-coral hover:underline underline-offset-2 font-semibold">
            Contact our team →
          </Link>
        </p>
      </div>
    </section>
  );
}
