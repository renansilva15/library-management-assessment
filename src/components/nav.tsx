'use client';

import type { JSX } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { LibraryBig, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { ADMIN_PAGE } from '@/constants/routes';

function AdminPageButton(): JSX.Element | null {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <Button asChild variant="outline" className="text-primary">
      <Link href={ADMIN_PAGE}>
        <LibraryBig className="h-5 w-5 text-primary" />
      </Link>
    </Button>
  );
}

export function Nav(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="flex items-center gap-2">
      <ThemeSwitcher />

      {isAuthenticated ? (
        <>
          <AdminPageButton />

          <Button variant="outline" className="text-primary" onClick={logout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </>
      ) : null}
    </nav>
  );
}
