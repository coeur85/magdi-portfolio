'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, BrainCircuit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => document.getElementById(link.href.substring(1)));
      let currentSection = '';

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;

      // Check if user has scrolled to the bottom of the page
      if (scrollPosition + windowHeight >= documentHeight - 5) { // -5px buffer
        const lastSection = navLinks[navLinks.length - 1];
        if (lastSection) {
            currentSection = lastSection.href;
        }
      } else {
        for (const section of sections) {
          if (section) {
            const sectionTop = section.offsetTop - 100; //-100 to make it more accurate
            if (scrollPosition >= sectionTop) {
              currentSection = `#${section.id}`;
            }
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BrainCircuit className="h-7 w-7 text-accent" />
          <span className="text-xl font-bold font-headline text-foreground">Ahmed Magdi</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all hover:scale-105 active:scale-95 ${
                activeSection === link.href ? 'text-accent font-bold' : 'text-muted-foreground hover:text-foreground'
              }`}
              prefetch={false}
              onClick={() => setActiveSection(link.href)}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-4 p-6">
                <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false} onClick={() => setOpen(false)}>
                  <BrainCircuit className="h-6 w-6 text-accent" />
                  <span className="text-xl font-bold font-headline">Ahmed Magdi</span>
                </Link>
                <nav className="grid gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex w-full items-center py-2 text-lg font-semibold transition-all hover:scale-105 active:scale-95 ${
                        activeSection === link.href ? 'text-accent' : ''
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
