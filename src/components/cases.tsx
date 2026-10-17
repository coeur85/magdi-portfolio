'use client';

import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/portfolio';

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  { key: 'problem', label: 'Problem' },
  { key: 'action', label: 'What I did' },
  { key: 'result', label: 'Result' },
] as const;

export default function Cases() {
  return (
    <section id="cases" data-scene="cases" className="relative pb-[12vh] pt-[50svh] md:py-[22vh]">
      <div className="container mx-auto grid px-4 md:grid-cols-2 md:gap-16 md:px-6">
        <div className="rounded-3xl bg-black/55 p-6 backdrop-blur-md md:col-start-2 md:bg-transparent md:p-0 md:backdrop-blur-none">
          <motion.div
            initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 1.1, ease }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Case studies</p>
            <h2 className="text-gradient mt-5 pb-1 text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              How I work through problems.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Four examples from my work, each with the problem, what I did and the result.
            </p>
          </motion.div>

          <div className="mt-12 space-y-12">
            {caseStudies.map((study) => (
              <motion.article
                key={study.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -12% 0px' }}
                transition={{ duration: 0.8, ease }}
                className="border-t border-white/10 pt-8"
              >
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{study.area}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">{study.title}</h3>
                <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-[6.5rem_1fr]">
                  {steps.map((step) => (
                    <div key={step.key} className="contents">
                      <dt className="text-sm font-medium text-foreground/70 sm:pt-0.5">{step.label}</dt>
                      <dd className="-mt-2 leading-relaxed text-muted-foreground sm:mt-0">{study[step.key]}</dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
