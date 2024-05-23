import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { useAuth } from '@/entities/auth';
import { toastContext } from '@/entities/toast';
import { userApi } from '@/entities/user';

function FollowUserButton({
  username,
  toggleFollowingState,
}: FollowUserButtonProps) {
  const { token } = useAuth();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const followUser = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      toggleFollowingState();
      await userApi.postUserFollow(username, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        toggleFollowingState();
      }
    }
  };

  return (
    <CommonButton outLineBorderColor="primary" onClick={followUser}>
      <CommonIcon icon="ion-plus-round"></CommonIcon>
      &nbsp; Follow {username}
    </CommonButton>
  );
}

function FollowUserProfileButton({
  username,
  followUserFunc,
}: FollowUserProfileButtonProps) {
  return (
    <CommonButton
      outLineBorderColor="secondary"
      actionBtn="action-btn"
      onClick={followUserFunc}
    >
      <CommonIcon icon="ion-plus-round"></CommonIcon>
      &nbsp; follow {username}
    </CommonButton>
  );
}

export { FollowUserButton, FollowUserProfileButton };

type FollowUserButtonProps = {
  username: string;
  toggleFollowingState: () => void;
};

type FollowUserProfileButtonProps = {
  username: string;
  followUserFunc: () => Promise<void>;
};
