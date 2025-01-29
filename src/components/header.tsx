import { Book, User } from 'lucide-react';
import type { JSX } from 'react';
import { ThemeSwitcher } from './theme-switcher';
import { Button } from './ui/button';
import Link from 'next/link';

export function Header(): JSX.Element {
  return (
    <header className="h-24 shadow">
      <div className="flex h-full items-center justify-between p-4">
        <Book className="text-primary h-10 w-10" />

        <h1 className="text-primary text-3xl">Library Management</h1>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <Button asChild variant="outline" className="text-primary">
            <Link href="/">
              <User className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
