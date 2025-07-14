import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import Link from 'next/link';
import { StackIcon } from './stack-icon';

export default function Hero() {
  return (
    <section id="about" className="relative w-full overflow-hidden py-20 md:py-32 bg-background">
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <StackIcon name=".net core" className="absolute h-32 w-32 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-foreground" />
        <StackIcon name="react" className="absolute h-48 w-48 top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2 text-foreground" />
        <StackIcon name="azure" className="absolute h-24 w-24 bottom-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 text-foreground" />
        <StackIcon name="c#" className="absolute h-20 w-20 top-20 right-1/2 text-foreground" />
        <StackIcon name="javascript" className="absolute h-28 w-28 bottom-10 left-3/4 text-foreground" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
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
