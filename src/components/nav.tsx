'use client';

import { useState, type JSX } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { LibraryBig, LogOut, Menu } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { ADMIN_PAGE } from '@/constants/routes';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';

export function AdminPageButton(): JSX.Element | null {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <Button asChild variant="outline" className="w-full text-primary lg:w-auto">
      <Link href={ADMIN_PAGE}>
        <LibraryBig className="h-5 w-5 text-primary" />
        {/* TODO: This may not fit All designs */}
        <p className="lg:hidden">Admin</p>
      </Link>
    </Button>
  );
}

export function Nav(): JSX.Element {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = (): void => setIsOpen((prev) => !prev);

  return (
    <nav className="flex items-center gap-2">
      <ThemeSwitcher />

      {isAuthenticated ? (
        <>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild onClick={toggleIsOpen}>
              <Button className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <SheetTitle>Menu</SheetTitle>

              <div className="flex gap-4">
                <AdminPageButton />

                <Button
                  variant="outline"
                  className="w-full text-primary"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <p>Log out</p>
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden lg:block">
            <AdminPageButton />

            <Button variant="outline" className="text-primary" onClick={logout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </>
      ) : null}
    </nav>
  );
}
