'use client';

import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import {
  ArticleButton,
  ArticleIcon,
  Counter,
  articleApi,
} from '@/entities/article';
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
      <ArticleButton
        outLineBorderColor="primary"
        size="pull-xs-right"
        onClick={postFavoriteArticle}
      >
        <i className="ion-heart"></i>
      </ArticleButton>
    );
  }

  return (
    <ArticleButton outLineBorderColor="primary" onClick={postFavoriteArticle}>
      <ArticleIcon icon="ion-heart"></ArticleIcon>
      &nbsp; Favorite Post <Counter>({favoritesCount})</Counter>
    </ArticleButton>
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
