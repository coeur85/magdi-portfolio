'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // At the very bottom the last section can be too short to reach the marker line.
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 5) {
        setActiveSection('#contact');
        return;
      }
      let current = '';
      for (const link of navLinks) {
        const section = document.getElementById(link.href.substring(1));
        if (section && window.scrollY >= section.offsetTop - window.innerHeight / 3) current = link.href;
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled ? 'bg-black/70 backdrop-blur-xl backdrop-saturate-150' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="#about" className="flex items-center gap-2.5 text-foreground" prefetch={false}>
          <Logo className="h-6 w-6" />
          <span className="text-[15px] font-semibold tracking-tight">Ahmed Magdi</span>
        </Link>
        <nav className="hidden items-center gap-8 text-[13px] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${
                activeSection === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
              prefetch={false}
              onClick={() => setActiveSection(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-black/90 backdrop-blur-xl">
            <SheetTitle className="flex items-center gap-2.5">
              <Logo className="h-6 w-6" />
              <span className="text-lg font-semibold tracking-tight">Ahmed Magdi</span>
            </SheetTitle>
            <nav className="mt-10 grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 text-3xl font-semibold tracking-tight transition-colors ${
                    activeSection === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  prefetch={false}
                  onClick={() => {
                    setActiveSection(link.href);
                    setOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <motion.div
        className="h-px origin-left bg-accent"
        style={{ scaleX: progress, opacity: isScrolled ? 1 : 0 }}
      />
    </header>
  );
}
