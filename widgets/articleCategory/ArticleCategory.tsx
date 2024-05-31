'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { NavItem, NavLink, FeedToggleLayout, CategoryNav } from '@/shared/ui';
import { decodeUrl } from '@/shared/lib';
import { authLib } from '@/entities/auth';
import { tagType } from '@/entities/tag';
import { determineUrlStatus } from './articleCategory.lib';

function ArticleCategory({
  articleCategoryItem = { article: true, feedArticle: true, tagArticle: true },
}: ArticleCategoryProps) {
  const {
    article = false,
    feedArticle = false,
    tagArticle = false,
    userArticle = false,
    userFavoritedArticle = false,
  } = articleCategoryItem;

  const { tag, username: initialUsername } = useParams<{
    tag: tagType.Tag;
    feed: string;
    username: string;
  }>();
  const username = decodeUrl(initialUsername);
  const pathname = usePathname();
  const { urlIsFeed, urlIsGlobalFeed, urlIsUser, urlIsUserFavorited } =
    determineUrlStatus(pathname, { tag: tag });
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = authLib.getClientAuthCookie();

    if (token) {
      setHasToken(true);
      return;
    }

    setHasToken(false);
  }, []);

  return (
    <FeedToggleLayout>
      <CategoryNav>
        {hasToken && (
          <NavItem isShow={feedArticle}>
            <NavLink isActive={urlIsFeed} href="/feed">
              Your Feed
            </NavLink>
          </NavItem>
        )}

        <NavItem isShow={article}>
          <NavLink isActive={urlIsGlobalFeed} href="/">
            Global Feed
          </NavLink>
        </NavItem>

        {tag && (
          <NavItem isShow={tagArticle}>
            <NavLink isActive={true}># {tag}</NavLink>
          </NavItem>
        )}

        <NavItem isShow={userArticle}>
          <NavLink isActive={urlIsUser} href={`/profile/${username}`}>
            My Articles
          </NavLink>
        </NavItem>

        <NavItem isShow={userFavoritedArticle}>
          <NavLink
            isActive={urlIsUserFavorited}
            href={`/profile/${username}/favorited`}
          >
            Favorited Articles
          </NavLink>
        </NavItem>
      </CategoryNav>
    </FeedToggleLayout>
  );
}

export { ArticleCategory };

type ArticleCategoryItemProps = {
  article?: boolean;
  feedArticle?: boolean;
  tagArticle?: boolean;
  userArticle?: boolean;
  userFavoritedArticle?: boolean;
};

type ArticleCategoryProps = {
  articleCategoryItem?: ArticleCategoryItemProps;
};
