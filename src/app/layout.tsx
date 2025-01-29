import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './providers';
import type { JSX } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Library Management',
  // TODO: Better SEO description
  description: 'Library Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    /*
     * The "suppressHydrationWarning" works only one level deep, meaning it does not
     * suppress warnings for the children of the <body> tag.
     *
     * We need to use it because of the ThemeProvider. This happens because Next.js
     * renders on the server, and we cannot determine the theme during server-side rendering.
     * As a result, the theme will always be undefined until it is mounted on the client.
     *
     * More at: https://github.com/pacocoursey/next-themes
     */
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
