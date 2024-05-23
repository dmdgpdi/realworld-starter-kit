import { tagType } from '@/entities/tag';

const determineUrlSatus = (
  pathname: string,
  param: {
    tag?: tagType.Tag;
    feed?: string;
    username?: string;
  },
) => {
  const urlIsFeed = pathname.includes('feed');
  const urlIsUserFavorited = pathname.includes('favorited');
  const urlIsUser = pathname.includes('profile') && !urlIsUserFavorited;
  const urlIsGlobalFeed =
    !urlIsFeed &&
    !urlIsUserFavorited &&
    !urlIsUser &&
    (param?.tag?.length ?? 0) <= 0;

  return { urlIsFeed, urlIsUserFavorited, urlIsUser, urlIsGlobalFeed };
};

export { determineUrlSatus };
