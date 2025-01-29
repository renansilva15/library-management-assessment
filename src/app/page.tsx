import { Auth } from '@/components/auth';
import { Header } from '@/components/header';
import type { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      <Header />
      <Auth />
    </main>
  );
}
