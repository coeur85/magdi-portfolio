'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { profile } from '@/lib/portfolio';

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
}

// Pinned statement whose words light up one by one as you scroll through it.
export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const words = profile.manifesto.split(' ');

  return (
    <section ref={ref} data-scene="manifesto" className="relative h-[240vh]">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="container mx-auto px-4 md:px-6">
          <p className="mx-auto max-w-5xl text-center text-4xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-5xl lg:text-6xl xl:text-7xl">
            {words.map((word, i) => {
              const start = 0.1 + (i / words.length) * 0.7;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, start + 0.7 / words.length]}>
                  {word}
                </Word>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
