import { Book } from 'lucide-react';
import type { JSX } from 'react';
import Link from 'next/link';
import { Nav } from './nav';

export function Header(): JSX.Element {
  return (
    <header className="fixed h-24 w-full shadow dark:shadow-primary">
      <div className="flex h-full items-center justify-between p-4">
        <Link href="/">
          <Book className="h-10 w-10 text-primary" />
        </Link>

        <h1 className="text-4xl font-bold text-primary">Library Management</h1>

        <Nav />
      </div>
    </header>
  );
}
