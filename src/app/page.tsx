import Header from '@/components/header';
import Hero from '@/components/hero';
import Skills from '@/components/skills';
import Projects from '@/components/projects';
import ResumeOptimizer from '@/components/resume-optimizer';
import Contact from '@/components/contact';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        <ResumeOptimizer />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
