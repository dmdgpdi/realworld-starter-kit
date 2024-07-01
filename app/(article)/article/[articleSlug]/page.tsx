import { redirect } from 'next/navigation';
import { ContainerLayout, ContainerPageLayout, RowLayout } from '@/shared/ui';
import {
  ArticleBannerLayout,
  ArticleContentLayout,
  ArticlePageLayout,
  articleApi,
} from '@/entities/article';
import { CommentLayout } from '@/entities/comment';
import { ArticleMenu } from '@/widgets';
import { CommentForm, CommentList } from '@/features/comment';
import { ArticleDescriptionTag } from '@/entities/tag';

//something change for github-action

export default async function ArticlePage({ params }: ArticlePageProps) {
  let article;
  const { articleSlug } = params;

  try {
    const { article: articleResponse } =
      await articleApi.getArticle(articleSlug);
    article = articleResponse;
  } catch (e) {
    redirect('/');
  }

  const { author } = article;
  const { body, updatedAt, favorited, favoritesCount, tagList, slug, title } =
    article;

  return (
    <ArticlePageLayout>
      <ArticleBannerLayout>
        <ContainerLayout>
          <h1 data-cy="article-title">{title}</h1>

          <ArticleMenu
            author={author}
            updatedAt={updatedAt}
            favorited={favorited}
            favoritesCount={favoritesCount}
            articleSlug={slug}
          />
        </ContainerLayout>
      </ArticleBannerLayout>

      <ContainerPageLayout>
        <ArticleContentLayout>
          <p>{body}</p>
          <ArticleDescriptionTag tagList={tagList} />
        </ArticleContentLayout>
        <hr />

        <RowLayout>
          <CommentLayout>
            <CommentForm />
            <CommentList articleSlug={articleSlug} />
          </CommentLayout>
        </RowLayout>
      </ContainerPageLayout>
    </ArticlePageLayout>
  );
}

type ArticlePageProps = {
  params: { articleSlug: string };
};
