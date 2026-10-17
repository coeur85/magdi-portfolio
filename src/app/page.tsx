import Header from '@/components/header';
import Intro from '@/components/intro';
import Work from '@/components/work';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import DatabaseCore from '@/components/core/database-core';

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-background">
      <DatabaseCore />
      <Header />
      <main className="relative z-10">
        <Intro />
        <Work />
        <Skills />
        {/* Contact and footer share the last screen so the contact heading clears the header. */}
        <div className="flex min-h-[100svh] flex-col">
          <Contact />
          <Footer />
        </div>
      </main>
    </div>
  );
}
