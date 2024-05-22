'use client';

import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { Counter, articleApi } from '@/entities/article';
import { useAuth } from '@/entities/auth';
import { toastContext } from '@/entities/toast';

function FavoriteArticleButton({
  articleSlug,
  favoritesCount,
  increaseFavoritesCount,
  decreaseFavoritesCount,
  isSmall,
}: FavoriteArticleProps) {
  const { token } = useAuth();

  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const postFavoriteArticle = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      increaseFavoritesCount();
      await articleApi.postFavoriteArticle(articleSlug, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        decreaseFavoritesCount();
      }
    }
  };

  if (isSmall) {
    return (
      <CommonButton
        outLineBorderColor="primary"
        size="pull-xs-right"
        onClick={postFavoriteArticle}
      >
        <i className="ion-heart"></i>
      </CommonButton>
    );
  }

  return (
    <CommonButton outLineBorderColor="primary" onClick={postFavoriteArticle}>
      <CommonIcon icon="ion-heart"></CommonIcon>
      &nbsp; Favorite Post <Counter>({favoritesCount})</Counter>
    </CommonButton>
  );
}

export { FavoriteArticleButton };

type FavoriteArticleProps = {
  articleSlug: string;
  favoritesCount: number;
  increaseFavoritesCount: () => void;
  decreaseFavoritesCount: () => void;
  isSmall?: boolean;
};
