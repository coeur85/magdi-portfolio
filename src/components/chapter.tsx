'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Chapter as ChapterData } from '@/lib/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Chapter({ chapter, index }: { chapter: ChapterData; index: number }) {
  const ref = useRef<HTMLElement>(null);
  // The headline resolves out of a blur as the chapter scrolls into place.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] });
  const opacity = useTransform(scrollYProgress, [0.15, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [90, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const filter = useTransform(scrollYProgress, [0.2, 1], ['blur(14px)', 'blur(0px)']);

  return (
    <section ref={ref} id={chapter.id} data-scene={chapter.id} className="relative pb-[12vh] pt-[65svh] md:py-[22vh]">
      <div className="container mx-auto grid px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <div
          className={`rounded-3xl bg-black/55 p-6 backdrop-blur-md md:bg-transparent md:p-0 md:backdrop-blur-none ${
            chapter.side === 'right' ? 'md:col-start-2' : ''
          }`}
        >
          <motion.div style={{ opacity, y, scale, filter }} className="origin-left">
            <p className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <span className="h-px w-8 bg-accent/60" />
              {chapter.eyebrow}
            </p>
            <h2 className="text-gradient mt-5 pb-1 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              {chapter.headline}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">{chapter.sub}</p>
          </motion.div>

          {(chapter.ai || chapter.aiUses) && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, ease }}
              className="mt-8 rounded-2xl border border-accent/25 bg-accent/[0.07] px-5 py-4"
            >
              {chapter.ai && (
                <p className="flex gap-3 text-[15px] leading-relaxed text-foreground/85">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    <span className="font-medium text-accent">With AI. </span>
                    {chapter.ai}
                  </span>
                </p>
              )}
              {chapter.aiUses && (
                <>
                  <p className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-accent">
                    <Sparkles className="h-4 w-4" />
                    AI in every part
                  </p>
                  <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                    {chapter.aiUses.map((use) => (
                      <div key={use.label}>
                        <dt className="font-medium text-foreground">{use.label}</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-muted-foreground">{use.text}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}
            </motion.div>
          )}

          <ul className="mt-10">
            {chapter.projects.map((project, i) => (
              <motion.li
                key={project.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.8, delay: i * 0.06, ease }}
                className="group border-t border-white/10 py-6"
              >
                <h3 className="flex items-center gap-3 text-lg font-medium tracking-tight text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_hsl(var(--accent))]" />
                  {project.title}
                </h3>
                <p className="mt-2 pl-[18px] leading-relaxed text-muted-foreground">{project.summary}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
