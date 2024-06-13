import { redirect } from 'next/navigation';
import { decodeUrl } from '@/shared/lib';
import { ProfilePageLayout, userApi } from '@/entities/user';
import { authServerAction } from '@/entities/auth';
import { ProfileInfo } from '@/widgets';

export default async function ProfileLayout({
  params,
  children,
}: ProfileLayoutProps) {
  const token = await authServerAction.getAuthCookie();

  if (!token) {
    redirect('/login');
  }

  const username = decodeUrl(params.username);
  let profile;

  try {
    const { profile: profileResponse } = await userApi.getUserProfile(username);
    profile = profileResponse;
  } catch (e) {
    redirect('/');
  }

  return (
    <ProfilePageLayout>
      <ProfileInfo profile={profile} />
      {children}
    </ProfilePageLayout>
  );
}

type ProfileLayoutProps = {
  params: { username: string };
  children: React.ReactNode;
};
