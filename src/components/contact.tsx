'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { socialLinks } from '@/components/social';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section
      id="contact"
      data-scene="contact"
      ref={ref}
      className="relative flex flex-1 flex-col justify-between gap-12 px-4 pb-16 pt-32 text-center md:px-6"
    >
      <motion.div style={{ scale, opacity }}>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Contact</p>
        <h2 className="mx-auto mt-5 max-w-4xl pb-2 text-[2.6rem] font-semibold sm:text-5xl leading-[1.02] tracking-[-0.045em] md:text-7xl">
          <span className="text-gradient">Let&apos;s keep your data</span>{' '}
          <span className="text-gradient-accent">fast, safe and online.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Open to new projects, roles and conversations about databases, cloud and the systems around them.
        </p>
      </motion.div>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        className="mx-auto flex flex-wrap items-center justify-center gap-3"
      >
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <motion.li
            key={label}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          >
            <Link
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              prefetch={false}
              className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-medium text-foreground/90 backdrop-blur-md transition-all hover:border-accent/60 hover:bg-accent/10 hover:text-foreground active:scale-95"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
