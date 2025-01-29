import { Auth } from '@/components/auth';
import type { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      <Auth />
    </main>
  );
}
