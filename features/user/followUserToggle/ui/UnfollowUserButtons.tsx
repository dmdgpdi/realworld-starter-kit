import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { toastContext } from '@/entities/toast';
import { userApi } from '@/entities/user';
import { authServerAction } from '@/entities/auth';

function UnfollowUserButton({
  username,
  toggleFollowingState,
}: UnfollowUserButtonProps) {
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const unfollowUser = async () => {
    try {
      toggleFollowingState();
      const token = await authServerAction.getAuthCookie();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

      await userApi.deleteUserFollow(username, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        toggleFollowingState();
      }
    }
  };

  return (
    <CommonButton outLineBorderColor="secondary" onClick={unfollowUser}>
      <CommonIcon icon="ion-plus-round"></CommonIcon>
      &nbsp; Unfollow {username}
    </CommonButton>
  );
}

function UnfollowUserProfileButton({
  username,
  unfollowUserFunc,
}: UnfollowUserProfileButtonProps) {
  return (
    <CommonButton
      outLineBorderColor="secondary"
      actionBtn="action-btn"
      onClick={unfollowUserFunc}
    >
      <CommonIcon icon="ion-plus-round"></CommonIcon>
      &nbsp; unfollow {username}
    </CommonButton>
  );
}

export { UnfollowUserButton, UnfollowUserProfileButton };

type UnfollowUserButtonProps = {
  username: string;
  toggleFollowingState: () => void;
};

type UnfollowUserProfileButtonProps = {
  username: string;
  unfollowUserFunc: () => Promise<void>;
};
