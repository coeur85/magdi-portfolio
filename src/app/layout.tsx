import type { Metadata } from 'next';
import './globals.css';
import ClientLayout from './client-layout';

export const metadata: Metadata = {
  title: 'Ahmed Magdi',
  description: 'Personal portfolio of Ahmed Magdi, a Software and DevOps Engineer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
