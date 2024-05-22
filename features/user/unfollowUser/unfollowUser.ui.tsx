import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { useAuth } from '@/entities/auth';
import { toastContext } from '@/entities/toast';
import { userApi } from '@/entities/user';

function UnfollowUserButton({
  username,
  toggleFollowingState,
}: UnfollowUserButtonProps) {
  const { token } = useAuth();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const unfollowUser = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      toggleFollowingState();
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

export { UnfollowUserButton };

type UnfollowUserButtonProps = {
  username: string;
  toggleFollowingState: () => void;
};
