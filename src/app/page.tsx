import Header from '@/components/header';
import Intro from '@/components/intro';
import About from '@/components/about';
import Cases from '@/components/cases';
import Work from '@/components/work';
import Skills from '@/components/skills';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import DatabaseCore from '@/components/core/database-core';
import { structuredData } from '@/lib/seo';

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-background">
      <script
        type="application/ld+json"
        // Escape "<" so the JSON can't close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <DatabaseCore />
      <Header />
      <main className="relative z-10">
        <Intro />
        <About />
        <Cases />
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
