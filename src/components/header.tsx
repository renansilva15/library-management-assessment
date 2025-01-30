import { Book, LogOut, User } from 'lucide-react';
import type { JSX } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { Button } from './ui/button';
import Link from 'next/link';

export function Header(): JSX.Element {
  return (
    <header className="fixed h-24 w-full shadow dark:shadow-primary">
      <div className="flex h-full items-center justify-between p-4">
        <Link href="/">
          <Book className="h-10 w-10 text-primary" />
        </Link>

        <h1 className="text-3xl text-primary">Library Management</h1>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <Button asChild variant="outline" className="text-primary">
            <Link href="/">
              <LogOut className="h-5 w-5" />
              {/* <User className="h-5 w-5" /> */}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
