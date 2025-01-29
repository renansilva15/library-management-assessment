'use client';

import { useTheme } from 'next-themes';
import type { JSX } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMounted } from '@/hooks/use-mounted';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export function ThemeSwitcher(): JSX.Element | null {
  const { theme, setTheme } = useTheme();
  const isMounted = useMounted();

  // TODO: Add Button Skeleton
  if (!isMounted) {
    return null;
  }

  const isDark = theme === Theme.Dark;

  const updateTheme = (): void => {
    setTheme(isDark ? Theme.Light : Theme.Dark);
  };

  return (
    <Button
      variant="outline"
      onClick={updateTheme}
      className="flex items-center gap-2 rounded-full !p-4"
    >
      {isDark ? <Sun size={28} /> : <Moon size={28} />}
      <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
    </Button>
  );
}
