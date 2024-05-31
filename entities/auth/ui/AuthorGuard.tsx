'use server';

import { redirect } from 'next/navigation';
import { getAuthCookie } from '../auth.serverAction';
import { authApi } from '..';

async function AuthorGuard({ authorUserName, children }: AuthorGuardProps) {
  const authToken = await getAuthCookie();

  if (!authToken) {
    redirect('/');
  }

  try {
    const { user } = await authApi.getUserInfor(authToken);

    if (user.username !== authorUserName) {
      throw new Error('aa');
    }
  } catch (error) {
    redirect('/');
  }

  return children;
}

export { AuthorGuard };

type AuthorGuardProps = {
  authorUserName: string;
  children: React.ReactNode;
};
