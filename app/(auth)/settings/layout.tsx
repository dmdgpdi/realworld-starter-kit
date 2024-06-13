import { redirect } from 'next/navigation';
import { AuthGuard, authServerAction } from '@/entities/auth';

export default async function SettingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await authServerAction.getAuthCookie();

  if (!token) {
    redirect('/login');
  }

  return <AuthGuard>{children}</AuthGuard>;
}
