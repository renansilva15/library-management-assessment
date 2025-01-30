import { Book } from 'lucide-react';
import type { JSX } from 'react';
import Link from 'next/link';
import { Nav } from './nav';
import { ADMIN_PAGE } from '@/constants/routes';

export function Header(): JSX.Element {
  return (
    <header className="fixed h-24 w-full shadow dark:shadow-primary">
      <div className="flex h-full items-center justify-between p-4">
        <Link href={ADMIN_PAGE}>
          <Book className="h-10 w-10 text-primary" />
        </Link>

        <h1 className="text-3xl text-primary">Library Management</h1>

        <Nav />
      </div>
    </header>
  );
}
