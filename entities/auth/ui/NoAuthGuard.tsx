'use client';

import { getAuthCookie } from '../auth.serverAction';
import { redirect } from 'next/navigation';

async function NoAuthGuard({ children }: NoAuthGuardProps) {
  const authToken = await getAuthCookie();

  if (authToken) {
    redirect('/');
  }

  return children;
}

export { NoAuthGuard };

type NoAuthGuardProps = {
  children: React.ReactNode;
};
