'use server';

import { getAuthCookie } from '../auth.serverAction';
import { redirect } from 'next/navigation';

async function AuthGuard({ children }: AuthGuardProps) {
  const authToken = await getAuthCookie();

  if (!authToken) {
    redirect('/');
  }

  return children;
}

export { AuthGuard };

type AuthGuardProps = {
  children: React.ReactNode;
};
