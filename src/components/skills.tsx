'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Skills() {
  return (
    <section id="skills" data-scene="skills" className="relative pb-[12vh] pt-[65svh] md:py-[22vh]">
      <div className="container mx-auto grid px-4 md:grid-cols-12 md:px-6">
        <div className="rounded-3xl bg-black/55 p-6 backdrop-blur-md md:col-span-8 md:bg-transparent md:p-0 md:backdrop-blur-none lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Toolkit</p>
            <h2 className="text-gradient mt-5 pb-1 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              What the work runs on.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
              The database and cloud stack behind the projects above, plus the software and DevOps tools I build with.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {skills.map((group, i) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.1, ease }}
              >
                <h3 className="border-b border-white/10 pb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground/80">
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-[17px] tracking-tight text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
