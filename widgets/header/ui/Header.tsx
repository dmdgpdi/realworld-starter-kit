'use server';

import { authApi, authServerAction } from '@/entities/auth';
import AuthenticatedUserHeader from './AuthenticatedUserHeader';
import UnauthenticatedUserHeader from './UnauthenticatedUserHeader';

async function Header() {
  const isLoggedIn = await authServerAction.hasAuthCookie();

  if (isLoggedIn) {
    const token = (await authServerAction.getAuthCookie()) ?? 'undefined';
    const userInfor = await authApi.getUserInfor(token);
    const { user } = userInfor;

    return <AuthenticatedUserHeader userName={user.username} />;
  }

  return <UnauthenticatedUserHeader />;
}

export { Header };
