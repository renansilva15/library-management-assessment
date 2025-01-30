'use client';

import type { JSX } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

export function Nav(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="flex items-center gap-2">
      <ThemeSwitcher />

      {isAuthenticated ? (
        <>
          <Button asChild variant="outline" className="text-primary">
            <Link href="/">Test</Link>
          </Button>

          <Button variant="outline" className="text-primary" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </>
      ) : null}
    </nav>
  );
}
