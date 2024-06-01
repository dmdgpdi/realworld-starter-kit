import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { toastContext } from '@/entities/toast';
import { userApi } from '@/entities/user';
import { authServerAction } from '@/entities/auth';

function FollowUserButton({
  username,
  toggleFollowingState,
}: FollowUserButtonProps) {
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const followUser = async () => {
    try {
      toggleFollowingState();
      const token = await authServerAction.getAuthCookie();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

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
