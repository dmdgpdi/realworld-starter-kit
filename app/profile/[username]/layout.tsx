import { decodeUrl } from '@/shared/lib';
import { ProfilePageLayout, userApi } from '@/entities/user';
import { ProfileInfo } from '@/widgets';
import { redirect } from 'next/navigation';

export default async function ProfileLayout({
  params,
  children,
}: ProfileLayoutProps) {
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
