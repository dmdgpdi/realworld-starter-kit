import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { ArticleButton, ArticleIcon } from '@/entities/article';
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
    <ArticleButton outLineBorderColor="primary" onClick={followUser}>
      <ArticleIcon icon="ion-plus-round"></ArticleIcon>
      &nbsp; Follow {username}
    </ArticleButton>
  );
}

export { FollowUserButton };

type FollowUserButtonProps = {
  username: string;
  toggleFollowingState: () => void;
};
