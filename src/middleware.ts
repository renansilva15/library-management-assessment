import { Role } from '@/types/role';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest): NextResponse | void {
  const userCookie = req.cookies.get('user');

  console.log(userCookie);

  if (!userCookie) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const user = JSON.parse(userCookie.value);

    console.log(user);

    if (user.role !== Role.Admin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: '/admin/:path*',
};
