'use client';

import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { Counter, articleApi } from '@/entities/article';
import { useAuth } from '@/entities/auth';
import { toastContext } from '@/entities/toast';

function UnfavoriteArticleButton({
  articleSlug,
  favoritesCount,
  increaseFavoritesCount,
  decreaseFavoritesCount,
  isSmall,
}: UnfavoriteArticleProps) {
  const { token } = useAuth();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const postUnfavoriteArticle = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      decreaseFavoritesCount();
      await articleApi.postUnfavoriteArticle(articleSlug, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
        increaseFavoritesCount();
      }
    }
  };

  if (isSmall) {
    return (
      <CommonButton
        outLineBorderColor="secondary"
        size="pull-xs-right"
        onClick={postUnfavoriteArticle}
      >
        <i className="ion-heart"></i>
        {` ${favoritesCount}`}
      </CommonButton>
    );
  }

  return (
    <CommonButton
      outLineBorderColor="secondary"
      onClick={postUnfavoriteArticle}
    >
      <CommonIcon icon="ion-heart"></CommonIcon>
      &nbsp; Unfavorite Post <Counter>({favoritesCount})</Counter>
    </CommonButton>
  );
}

export { UnfavoriteArticleButton };

type UnfavoriteArticleProps = {
  articleSlug: string;
  favoritesCount: number;
  increaseFavoritesCount: () => void;
  decreaseFavoritesCount: () => void;
  isSmall?: boolean;
};
