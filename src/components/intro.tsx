'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { profile } from '@/lib/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section id="top" data-scene="intro" ref={ref} className="relative h-[100svh] min-h-[640px]">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto flex h-full flex-col justify-end px-4 pb-12 md:justify-center md:px-6 md:pb-0"
      >
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mb-6 flex items-center gap-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, no image optimizer */}
            <img
              src={profile.photo}
              alt={profile.name}
              width={80}
              height={80}
              className="h-16 w-16 rounded-full object-cover ring-2 ring-accent/60 ring-offset-2 ring-offset-black sm:h-20 sm:w-20"
              style={{ objectPosition: 'center 30%' }}
            />
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Hi, I&apos;m</span>
          </motion.div>
          <h1 className="pb-2 text-6xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-7xl lg:text-8xl">
            {profile.name.split(' ').map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.15, ease }}
                className="text-gradient block pb-2"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="mt-6 text-xl font-medium tracking-tight text-foreground/90 sm:text-2xl"
          >
            {profile.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease }}
            className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground"
          >
            {profile.tagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="#contact"
              prefetch={false}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 active:scale-95"
            >
              Get in touch
            </Link>
            <Link
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              prefetch={false}
              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-foreground/90 transition hover:border-accent/60 hover:text-foreground active:scale-95"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: cueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-8 hidden flex-col items-center md:flex gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground"
      >
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 1 }}>
          Scroll
        </motion.span>
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-accent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
