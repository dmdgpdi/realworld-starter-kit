'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { getBaseImage } from '@/shared/lib';
import {
  ArticleMetaLayout,
  AuthorLink,
  DateDescription,
  InforLayout,
  articleLib,
  articleTypes,
} from '@/entities/article';
import { useAuthStore } from '@/entities/auth';
import { DeleteArticleButton, ToggleFavoriteButton } from '@/features/article';
import { FollowUserToggleButton } from '@/features/user';

function ArticleMenu({
  author,
  updatedAt,
  favorited,
  favoritesCount,
  articleSlug,
}: ArticleMenuProps) {
  const router = useRouter();
  const userInformation = useAuthStore(state => state.userInfo);
  const isAuthorEqualUser = author.username === userInformation?.username;
  const authorImage = author.image === '' ? getBaseImage() : author.image;

  return (
    <ArticleMetaLayout>
      <Link href={`/profile/${author.username}`}>
        <Image
          src={authorImage}
          alt={`author ${author.username}'s profile image.`}
          width={50}
          height={50}
        />
      </Link>
      <InforLayout>
        <AuthorLink
          href={`/profile/${author.username}`}
          data-cy="user-profile-link"
        >
          {author.username}
        </AuthorLink>
        <DateDescription>{articleLib.formatDate(updatedAt)}</DateDescription>
      </InforLayout>
      <FollowUserToggleButton
        username={author.username}
        isFollowing={author.following}
      />
      &nbsp;&nbsp;
      <ToggleFavoriteButton
        articleSlug={articleSlug}
        favorited={favorited}
        favoritesCount={favoritesCount}
      />
      {isAuthorEqualUser && (
        <>
          {' '}
          <CommonButton
            outLineBorderColor="secondary"
            onClick={() => {
              router.push(`/editor/${articleSlug}`);
            }}
            data-cy="article-update-button"
          >
            <CommonIcon icon="ion-edit"></CommonIcon> Edit Article
          </CommonButton>
          <DeleteArticleButton articleSlug={articleSlug} />
        </>
      )}
    </ArticleMetaLayout>
  );
}

export { ArticleMenu };

type ArticleMenuProps = {
  author: articleTypes.AuthorType;
  updatedAt: string;
  favoritesCount: number;
  favorited: boolean;
  articleSlug: string;
};
