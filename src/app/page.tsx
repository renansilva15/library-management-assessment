import { Auth } from '@/components/auth';
import { ThemeSwitcher } from '@/components/theme-switcher';
import type { JSX } from 'react';

export default function Home(): JSX.Element {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Auth />
      <ThemeSwitcher />
    </main>
  );
}
