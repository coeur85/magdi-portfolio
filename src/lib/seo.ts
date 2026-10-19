// Search metadata and schema.org structured data, built from the page content so they stay in sync.
// The goal is a clear identity for searches on the name: one canonical URL, the name first in the
// title, and a Person linked to the same profiles everywhere (sameAs).

import type { Metadata } from 'next';
import { profile, skills } from '@/lib/portfolio';
import { socialLinks } from '@/components/social';

export const siteTitle = `${profile.name} — Database Administrator, Software & DevOps Engineer`;
// Kept under ~160 characters so search results show it whole.
export const siteDescription = `${profile.name} (${profile.alternateNames.join(', ')}), SQL Server database administrator and software & DevOps engineer: performance tuning, Azure SQL Managed Instance, high availability.`;

const [givenName, ...rest] = profile.name.split(' ');
const familyName = rest.join(' ');
const absolute = (path: string) => new URL(path, profile.url).href;
const home = absolute('/');
const ogImage = { url: '/og.png', width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` };
const profiles = socialLinks.map((link) => link.href).filter((href) => !href.startsWith('mailto:'));
const xProfile = profiles.find((href) => new URL(href).hostname === 'x.com');

export const siteMetadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: '/' },
  authors: [{ name: profile.name, url: home }],
  creator: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: profile.name,
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    firstName: givenName,
    lastName: familyName,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    creator: xProfile && `@${new URL(xProfile).pathname.slice(1)}`,
    images: [ogImage],
  },
};

const id = (fragment: string) => `${home}#${fragment}`;

// One graph: the Person, the WebSite (its name is what Google shows as the site name) and the
// ProfilePage that ties them together. https://developers.google.com/search/docs/appearance/structured-data/profile-page
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': id('person'),
      name: profile.name,
      alternateName: profile.alternateNames,
      givenName,
      familyName,
      url: home,
      image: absolute(profile.photo),
      email: `mailto:${profile.email}`,
      jobTitle: ['Database Administrator', 'Software Engineer', 'DevOps Engineer'],
      description: profile.tagline,
      knowsAbout: skills.flatMap((group) => group.items),
      sameAs: profiles,
      subjectOf: {
        '@type': 'DigitalDocument',
        name: `${profile.name} — CV`,
        url: absolute(profile.cv),
        encodingFormat: 'application/pdf',
      },
    },
    {
      '@type': 'WebSite',
      '@id': id('website'),
      url: home,
      name: profile.name,
      alternateName: [...profile.alternateNames, new URL(profile.url).hostname],
      inLanguage: 'en',
      publisher: { '@id': id('person') },
    },
    {
      '@type': 'ProfilePage',
      '@id': id('profilepage'),
      url: home,
      name: siteTitle,
      description: siteDescription,
      inLanguage: 'en',
      isPartOf: { '@id': id('website') },
      about: { '@id': id('person') },
      mainEntity: { '@id': id('person') },
      primaryImageOfPage: absolute(profile.photo),
      dateModified: new Date().toISOString(),
    },
  ],
};
