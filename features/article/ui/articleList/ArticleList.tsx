import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { articleLib, articleTypes } from '@/entities/article';
import { ArticleDescriptionTag } from '@/entities/tag';
import { isEmptyList } from '@/shared/lib';

function ArticleItem({ article }: { article: articleTypes.ArticleType }) {
  return (
    <article className="article-preview">
      <div className="article-meta">
        <Link href="/profile/eric-simons">
          <Image
            src={article.author.image}
            alt={article.author.username}
            width={100}
            height={100}
          />
        </Link>
        <div className="info">
          <Link href={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {articleLib.formatDate(article.updatedAt)}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favorited}
        </button>
      </div>
      <Link href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ArticleDescriptionTag tagList={article.tagList} />
      </Link>
    </article>
  );
}

async function ArticleList({ articleList }: ArticleListProps) {
  if (isEmptyList(articleList)) {
    return undefined;
  }

  return (
    <section>
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
