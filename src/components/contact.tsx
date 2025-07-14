'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Linkedin, Mail } from 'lucide-react';
import { StackIcon } from './stack-icon';
import { motion } from 'framer-motion';

const UpworkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.12,9.33a5.3,5.3,0,0,0-4.33-4.32,1,1,0,0,0-1.1,1.32,1,1,0,0,0,1.32,1.1,3.31,3.31,0,0,1,2.6,3.34,3.28,3.28,0,0,1-3.28,3.28H12.3v3.66a1,1,0,1,0,2,0V16.39h.44A5.3,5.3,0,0,0,18.12,9.33Zm-7.39,5.44H9.3v3.66a1,1,0,1,0,2,0V13.43a1,1,0,0,0-1-1H9.3a1,1,0,0,0-1,1v.34a1,1,0,1,0,2,0V13.77h.23A3.68,3.68,0,0,0,10.73,8a3.69,3.69,0,0,0-7.38,0,1,1,0,1,0,2,0,1.69,1.69,0,1,1,3.38,0,1,1,0,0,0-1,1v4.77Z"/>
  </svg>
);

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);


export default function Contact() {

  return (
    <section id="contact" className="relative w-full overflow-hidden py-20 md:py-32 bg-secondary/20">
        <div className="absolute inset-0 z-0 opacity-[0.03]">
            <StackIcon name="c#" className="absolute h-24 w-24 top-10 left-10 text-foreground animate-float" style={{ animationDuration: '2.4s' }} />
            <StackIcon name="python" className="absolute h-32 w-32 bottom-1/2 right-10 text-foreground animate-float" style={{ animationDelay: '-0.6s' }} />
            <StackIcon name="powershell" className="absolute h-40 w-40 bottom-20 left-1/4 text-foreground animate-float" style={{ animationDuration: '3s' }} />
            <StackIcon name="git" className="absolute h-20 w-20 top-1/2 right-3/4 text-foreground animate-float" style={{ animationDelay: '-0.3s' }} />
            <StackIcon name="mysql" className="absolute h-28 w-28 bottom-10 right-1/2 text-foreground animate-float" style={{ animationDuration: '3.6s', animationDelay: '-1.8s' }} />
        </div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl">Get in Touch</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
            </div>
          <div className="flex flex-col items-center gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-6"
            >
              <Link href="https://github.com/coeur85" target="_blank" className="flex flex-col items-center gap-2 text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
                <Github className="h-10 w-10" />
                <span>GitHub</span>
              </Link>
              <Link href="https://www.linkedin.com/in/ahmedmmagdi/" target="_blank" className="flex flex-col items-center gap-2 text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
                <Linkedin className="h-10 w-10" />
                <span>LinkedIn</span>
              </Link>
              <Link href="https://x.com/Coeur85" target="_blank" className="flex flex-col items-center gap-2 text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
                <XIcon className="h-10 w-10" />
                <span>X</span>
              </Link>
              <Link href="https://upwork.com/freelancers/magdi" target="_blank" className="flex flex-col items-center gap-2 text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
                <UpworkIcon className="h-10 w-10" />
                <span>Upwork</span>
              </Link>
              <Link href="mailto:me@amagdi.dev" className="flex flex-col items-center gap-2 text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
                <Mail className="h-10 w-10" />
                <span>Email</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
