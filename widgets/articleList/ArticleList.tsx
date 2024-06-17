import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { isEmptyList } from '@/shared/lib';
import {
  articleLib,
  articleTypes,
  DateDescription,
  ArticlePreviewLayout,
  ArticleMetaLayout,
  InforLayout,
} from '@/entities/article';
import { ArticleDescriptionTag } from '@/entities/tag';
import { ToggleFavoriteButton } from '@/features/article';

function ArticleItem({ article }: { article: articleTypes.ArticleType }) {
  const { author, slug, favorited, favoritesCount } = article;

  return (
    <ArticlePreviewLayout>
      <ArticleMetaLayout>
        <Link href={`/profile/${author.username}`} data-cy="user-profile-link">
          <Image
            src={author.image}
            alt={author.username}
            width={100}
            height={100}
          />
        </Link>
        <InforLayout>
          <Link href={`/profile/${author.username}`} className="author">
            {author.username}
          </Link>
          <DateDescription>
            {articleLib.formatDate(article.updatedAt)}
          </DateDescription>
        </InforLayout>
        <ToggleFavoriteButton
          articleSlug={slug}
          favorited={favorited}
          favoritesCount={favoritesCount}
          isSmall={true}
        />
      </ArticleMetaLayout>
      <Link href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ArticleDescriptionTag tagList={article.tagList} />
      </Link>
    </ArticlePreviewLayout>
  );
}

async function ArticleList({ articleList }: ArticleListProps) {
  if (isEmptyList(articleList)) {
    return undefined;
  }

  return (
    <section data-cy="article-list">
      {articleList.map(article => (
        <ArticleItem article={article} key={article.slug} />
      ))}
    </section>
  );
}

export { ArticleList };

type ArticleListProps = {
  articleList: articleTypes.ArticleType[];
};
