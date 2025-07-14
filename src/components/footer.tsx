import Link from 'next/link';
import { Github, Linkedin, Mail, BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-primary/20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-accent" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Magdi. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/coeur85" target="_blank" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/ahmedmmagdi/" target="_blank" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="mailto:me@amagdi.dev" className="text-muted-foreground hover:text-foreground" prefetch={false}>
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
