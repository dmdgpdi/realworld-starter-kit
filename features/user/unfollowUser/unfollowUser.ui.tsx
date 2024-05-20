import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { ArticleButton, ArticleIcon } from '@/entities/article';
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
    <ArticleButton outLineBorderColor="secondary" onClick={unfollowUser}>
      <ArticleIcon icon="ion-plus-round"></ArticleIcon>
      &nbsp; Unfollow {username}
    </ArticleButton>
  );
}

export { UnfollowUserButton };

type UnfollowUserButtonProps = {
  username: string;
  toggleFollowingState: () => void;
};
