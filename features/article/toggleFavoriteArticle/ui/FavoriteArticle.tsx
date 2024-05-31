'use client';

import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { Counter, articleApi } from '@/entities/article';
import { toastContext } from '@/entities/toast';
import { authServerAction } from '@/entities/auth';

function FavoriteArticleButton({
  articleSlug,
  favoritesCount,
  increaseFavoritesCount,
  decreaseFavoritesCount,
  isSmall,
}: FavoriteArticleProps) {
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const postFavoriteArticle = async () => {
    try {
      increaseFavoritesCount();
      const token = await authServerAction.getAuthCookie();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

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
        {` ${favoritesCount}`}
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
