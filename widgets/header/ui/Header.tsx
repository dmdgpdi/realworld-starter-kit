'use server';

import { authServerAction } from '@/entities/auth';
import AuthenticatedUserHeader from './AuthenticatedUserHeader';
import UnauthenticatedUserHeader from './UnauthenticatedUserHeader';

async function Header() {
  const isLoggedIn = await authServerAction.getAuthCookie();

  if (isLoggedIn) {
    return <AuthenticatedUserHeader userName={'username'} />;
  }

  return <UnauthenticatedUserHeader />;
}

export { Header };
