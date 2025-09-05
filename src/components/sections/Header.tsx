'use client';
import { trackConsultationClick } from '@/lib/gtm';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/modern-suite', label: 'Suite' },
  { href: '/about', label: 'About' },
  { href: '/clients', label: 'Clients' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/outcomes', label: 'Results' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'mx-auto w-full transition-all duration-300',
          scrolled ? 'bg-kpsNavy/95 backdrop-blur-md border-b border-white/10' : 'bg-transparent',
        )}
      >
        <nav
          className="container flex h-16 items-center justify-between"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-kpsGold/60 rounded-md p-1"
            aria-label="The KPS Group - Go to homepage"
          >
            <span className="inline-block h-3 w-3 rounded-full bg-kpsGold" aria-hidden="true" />
            <span className="font-semibold text-white text-lg">The KPS Group</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-white/90 hover:text-white transition-colors underline-offset-4 decoration-transparent hover:decoration-kpsGold font-medium group"
              >
                <span className="flex items-center gap-2">{item.label}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-kpsGold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/consultation"
              onClick={() => trackConsultationClick('header')}
              className="rounded-full bg-kpsGold text-kpsNavy px-6 py-3 font-semibold hover:opacity-90 focus:ring-2 focus:ring-kpsGold/60 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg border border-white/20 text-white/90 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <span className="text-lg">{open ? '×' : '≡'}</span>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-kpsNavy text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <span className="inline-block h-3 w-3 rounded-full bg-kpsGold" />
                    <span className="font-semibold text-lg">Menu</span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/20 hover:bg-white/10 transition-colors touch-manipulation"
                  >
                    ×
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="space-y-2 mb-8">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-4 text-lg hover:bg-white/10 transition-colors touch-manipulation"
                  >
                    <span>Home</span>
                  </Link>
                  {NAV.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-4 text-lg hover:bg-white/10 transition-colors touch-manipulation"
                    >
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  href="/consultation"
                  onClick={() => {
                    setOpen(false);
                    trackConsultationClick('mobile_menu');
                  }}
                  className="block w-full text-center rounded-full bg-kpsGold text-kpsNavy px-6 py-4 font-semibold hover:opacity-95 transition-opacity touch-manipulation"
                >
                  Book Free Consultation
                </Link>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                  <div className="text-sm text-white/70 mb-2">Quick Contact</div>
                  <a
                    href="tel:14694586966"
                    className="block text-white hover:text-kpsGold transition-colors mb-2 touch-manipulation"
                  >
                    (469) 458-6966
                  </a>
                  <a
                    href="mailto:sales@thekpsgroup.com"
                    className="block text-white hover:text-kpsGold transition-colors touch-manipulation"
                  >
                    sales@thekpsgroup.com
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
