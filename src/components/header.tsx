import { Book } from 'lucide-react';
import type { JSX } from 'react';
import Link from 'next/link';
import { Nav } from './nav';

export function Header(): JSX.Element {
  return (
    <header className="fixed h-24 w-full bg-background opacity-100 shadow dark:shadow-primary">
      <div className="flex h-full items-center justify-between p-4">
        <Link href="/">
          <Book className="h-10 w-10 text-primary" />
        </Link>

        <h1 className="line-clamp-2 pl-4 text-2xl font-bold text-primary lg:line-clamp-none lg:pl-0 lg:text-4xl">
          Library Management
        </h1>

        <Nav />
      </div>
    </header>
  );
}
