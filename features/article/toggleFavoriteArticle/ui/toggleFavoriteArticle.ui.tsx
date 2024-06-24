'use client';

import { useState } from 'react';
import { FavoriteArticleButton } from './FavoriteArticle';
import { UnfavoriteArticleButton } from './UnfavoriteArticle';

function ToggleFavoriteButton({
  favorited,
  favoritesCount,
  articleSlug,
  isSmall,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [curFavoritesCount, setCurFavoritesCount] = useState(favoritesCount);

  const increaseFavoritesCount = () => {
    setIsFavorited(true);
    setCurFavoritesCount(count => count + 1);
  };

  const decreaseFavoritesCount = () => {
    setIsFavorited(false);
    setCurFavoritesCount(count => count - 1);
  };

  if (isSmall) {
    return isFavorited ? (
      <UnfavoriteArticleButton
        articleSlug={articleSlug}
        favoritesCount={curFavoritesCount}
        increaseFavoritesCount={increaseFavoritesCount}
        decreaseFavoritesCount={decreaseFavoritesCount}
        isSmall={true}
      />
    ) : (
      <FavoriteArticleButton
        articleSlug={articleSlug}
        favoritesCount={curFavoritesCount}
        increaseFavoritesCount={increaseFavoritesCount}
        decreaseFavoritesCount={decreaseFavoritesCount}
        isSmall={true}
      />
    );
  }

  return isFavorited ? (
    <UnfavoriteArticleButton
      articleSlug={articleSlug}
      favoritesCount={curFavoritesCount}
      increaseFavoritesCount={increaseFavoritesCount}
      decreaseFavoritesCount={decreaseFavoritesCount}
    />
  ) : (
    <FavoriteArticleButton
      articleSlug={articleSlug}
      favoritesCount={curFavoritesCount}
      increaseFavoritesCount={increaseFavoritesCount}
      decreaseFavoritesCount={decreaseFavoritesCount}
    />
  );
}

export { ToggleFavoriteButton };

type FavoriteButtonProps = {
  favorited: boolean;
  favoritesCount: number;
  articleSlug: string;
  isSmall?: boolean;
};
