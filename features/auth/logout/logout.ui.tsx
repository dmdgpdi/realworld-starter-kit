'use client';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { CommonButton } from '@/shared/ui';
import { authServerAction, useAuthStore } from '@/entities/auth';
import { toastContext } from '@/entities/toast';

function LogoutButton() {
  const router = useRouter();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );
  const deleteUserInfo = useAuthStore(state => state.logout);

  const logout = async () => {
    try {
      await authServerAction.deleteAuthCookie();
      deleteUserInfo();
      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
      }
    }
  };

  return (
    <CommonButton
      outLineBorderColor="danger"
      onClick={logout}
      data-cy="logout-button"
    >
      Or click here to logout.
    </CommonButton>
  );
}

export { LogoutButton };
