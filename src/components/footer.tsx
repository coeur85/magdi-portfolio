import Link from 'next/link';
import { Github, Linkedin, Mail, BrainCircuit } from 'lucide-react';

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

export default function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-primary/20">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 py-8 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-accent" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Ahmed Magdi. All rights reserved.</p>
        </div>
        <div className="flex gap-4">
          <Link href="https://github.com/coeur85" target="_blank" className="text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://www.linkedin.com/in/ahmedmmagdi/" target="_blank" className="text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="https://x.com/Coeur85" target="_blank" className="text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
            <XIcon className="h-6 w-6" />
            <span className="sr-only">X</span>
          </Link>
          <Link href="https://upwork.com/freelancers/magdi" target="_blank" className="text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
            <UpworkIcon className="h-6 w-6" />
            <span className="sr-only">Upwork</span>
          </Link>
          <Link href="mailto:me@amagdi.dev" className="text-muted-foreground transition-all hover:text-foreground hover:scale-110 active:scale-95" prefetch={false}>
            <Mail className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
