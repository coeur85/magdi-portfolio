import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section id="about" className="w-full py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground/80 to-foreground">
                Hi, I'm Magdi
              </h1>
              <h2 className="text-2xl font-medium text-accent font-headline">A Passionate Software & DevOps Engineer</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                I'm a dedicated developer with expertise in Database Administration, Software Engineering, and DevOps. I love building robust applications and scalable infrastructure. Welcome to my personal space on the web! 👋
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="#contact">Contact Me</Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <a href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="https://placehold.co/400x400.png"
              width={400}
              height={400}
              alt="Magdi's Headshot"
              className="rounded-full object-cover aspect-square shadow-2xl shadow-primary/20"
              data-ai-hint="professional headshot"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
