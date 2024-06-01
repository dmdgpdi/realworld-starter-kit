'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { authApi, authServerAction } from '@/entities/auth';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { toastContext } from '@/entities/toast';

function NavigateUpdateProfileButton({
  authorUsername,
}: NavigateUpdateProfileButtonProps) {
  const router = useRouter();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  const navigateUpdateProfile = () => {
    router.push('/settings');
  };

  useEffect(() => {
    const checkUserIsAuthor = async () => {
      try {
        const token = await authServerAction.getAuthCookie();

        if (!token) {
          return;
        }

        const { user: userInformation } = await authApi.getUserInfor(token!);

        if (userInformation?.username === authorUsername) {
          setUserIsAuthor(true);
          return;
        }

        setUserIsAuthor(false);
      } catch (error) {
        if (error instanceof Error) {
          createToast({ message: error.message });
        }
      }
    };

    checkUserIsAuthor();
  }, [authorUsername, createToast]);

  return (
    userIsAuthor && (
      <CommonButton
        outLineBorderColor="secondary"
        actionBtn="action-btn"
        onClick={navigateUpdateProfile}
      >
        <CommonIcon icon="ion-gear-a"></CommonIcon>
        &nbsp; Edit Profile Settings
      </CommonButton>
    )
  );
}

export { NavigateUpdateProfileButton };

type NavigateUpdateProfileButtonProps = {
  authorUsername: string;
};
