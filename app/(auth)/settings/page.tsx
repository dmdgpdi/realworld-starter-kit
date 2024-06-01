import { ContainerPageLayout, RowLayout } from '@/shared/ui';
import { AuthContentLayout, AuthH1, SettingPageLayout } from '@/entities/auth';
import { UpdateUserInfoForm } from '@/features/auth/updateUserInfo';
import { LogoutButton } from '@/features/auth';

export default function SettingPage() {
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
