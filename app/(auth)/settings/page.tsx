import { ContainerPageLayout, RowLayout, CommonButton } from '@/shared/ui';
import { AuthContentLayout, AuthH1, SettingPageLayout } from '@/entities/auth';
import { UpdateUserInfoForm } from '@/features/auth/updateUserInfo';

export default function SettingPage() {
  return (
    <SettingPageLayout>
      <ContainerPageLayout>
        <RowLayout>
          <AuthContentLayout>
            <AuthH1>Your Settings</AuthH1>
            <UpdateUserInfoForm />
            <hr />
            <CommonButton outLineBorderColor="danger">
              Or click here to logout.
            </CommonButton>
          </AuthContentLayout>
        </RowLayout>
      </ContainerPageLayout>
    </SettingPageLayout>
  );
}
