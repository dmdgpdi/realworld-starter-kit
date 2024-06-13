'use server';
import { ContainerPageLayout, RowLayout } from '@/shared/ui';
import { AuthContentLayout, AuthH1, SettingPageLayout } from '@/entities/auth';
import { LogoutButton, UpdateUserInfoForm } from '@/features/auth';

export default async function SettingPage() {
  return (
    <SettingPageLayout>
      <ContainerPageLayout>
        <RowLayout>
          <AuthContentLayout>
            <AuthH1>Your Settings</AuthH1>
            <UpdateUserInfoForm />
            <hr />
            <LogoutButton />
          </AuthContentLayout>
        </RowLayout>
      </ContainerPageLayout>
    </SettingPageLayout>
  );
}
