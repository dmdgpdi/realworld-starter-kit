import { redirect } from 'next/navigation';
import { authServerAction } from '@/entities/auth';

export default async function SettingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await authServerAction.getAuthCookie();

  if (!token) {
    redirect('/login');
  }

  return children;
}
