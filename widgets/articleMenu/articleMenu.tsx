'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArticleButton,
  ArticleIcon,
  ArticleMetaLayout,
  AuthorLink,
  DateDescription,
  InforLayout,
  articleLib,
  articleTypes,
} from '@/entities/article';
import { useAuth } from '@/entities/auth';
import { DeleteArticleButton, ToggleFavoriteButton } from '@/features/article';
import { FollowUserButton, UnfollowUserButton } from '@/features/user';

function FollowUserToggleButton({ username, isFollowing }: FollowButtonProps) {
  const [isFollowingAuthor, setIsFollowingAuthor] = useState(isFollowing);

  const toggleFollwingAuthor = () => {
    setIsFollowingAuthor(prev => !prev);
  };

  return isFollowingAuthor ? (
    <UnfollowUserButton
      username={username}
      toggleFollowingState={toggleFollwingAuthor}
    />
  ) : (
    <FollowUserButton
      username={username}
      toggleFollowingState={toggleFollwingAuthor}
    />
  );
}

function ArticleMenu({
  author,
  updatedAt,
  favorited,
  favoritesCount,
  articleSlug,
}: ArticleMenuProps) {
  const router = useRouter();
  const { userInformation } = useAuth();
  const isAuthorEqualUser = author.username === userInformation?.username;

  return (
    <ArticleMetaLayout>
      <Link href={`/profile/${author.username}`}>
        <Image
          src={author.image}
          alt={`author ${author.username}'s profile image.`}
          width={50}
          height={50}
        />
      </Link>
      <InforLayout>
        <AuthorLink href={`/profile/${author.username}`}>
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
          <ArticleButton
            outLineBorderColor="secondary"
            onClick={() => {
              router.push(`/editor/${articleSlug}`);
            }}
          >
            <ArticleIcon icon="ion-edit"></ArticleIcon> Edit Article
          </ArticleButton>
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

type FollowButtonProps = {
  username: string;
  isFollowing: boolean;
};
