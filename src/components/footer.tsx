import Link from 'next/link';
import { Logo } from '@/components/logo';
import { socialLinks } from '@/components/social';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
        <div className="flex items-center gap-2.5">
          <Logo className="h-5 w-5 text-foreground" />
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Ahmed Magdi. All rights reserved.</p>
        </div>
        <div className="flex gap-5">
          {socialLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              prefetch={false}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              <span className="sr-only">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
