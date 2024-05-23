'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { useAuth } from '@/entities/auth';

function NavigateUpdateProfileButton({
  authorUsername,
}: NavigateUpdateProfileButtonProps) {
  const router = useRouter();
  const { userInformation } = useAuth();
  const [userIsAuthor, setUserIsAuthor] = useState(false);

  const navigateUpdateProfile = () => {
    router.push('/settings');
  };

  useEffect(() => {
    if (userInformation?.username === authorUsername) {
      setUserIsAuthor(true);
      return;
    }

    setUserIsAuthor(false);
  }, [authorUsername, userInformation?.username]);

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
