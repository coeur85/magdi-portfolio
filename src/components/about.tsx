'use client';

import { motion } from 'framer-motion';
import { about } from '@/lib/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  return (
    <section id="about" data-scene="about" className="relative pb-[12vh] pt-[50svh] md:py-[22vh]">
      <div className="container mx-auto grid px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <div className="rounded-3xl bg-black/55 p-6 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">About</p>
            <h2 className="text-gradient mt-5 pb-1 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              {about.headline}
            </h2>
          </motion.div>

          <div className="mt-8 space-y-5">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
                className="max-w-xl text-lg leading-relaxed text-foreground/85"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <dl className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {about.principles.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease }}
                className="border-t border-white/10 pt-4"
              >
                <dt className="font-medium text-foreground">{principle.title}</dt>
                <dd className="mt-1 leading-relaxed text-muted-foreground">{principle.text}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
