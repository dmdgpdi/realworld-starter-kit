import { redirect } from 'next/navigation';
import {
  ContainerLayout,
  ResponsiveWidthContainer,
  RowLayout,
} from '@/shared/ui';
import { decodeUrl } from '@/shared/lib';
import { ArticleConstant, articleApi, articleLib } from '@/entities/article';
import { ArticleList, Pagination } from '@/widgets';
import { ArticleCategory } from '@/widgets/articleCategory';

export default async function UserArticlePage({
  params,
}: UserArticlePageProps) {
  const currentPage = articleLib.getCorrectPage(params.articlePage);
  const offset = currentPage - 1;
  const username = decodeUrl(params.username);

  const { articles: articleList, articlesCount } =
    await articleApi.getArticleList({
      author: username,
      offset: offset * ArticleConstant.ARTICLES_PER_PAGE,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    });

  if (
    offset != 0 &&
    articlesCount <= ArticleConstant.ARTICLES_PER_PAGE * offset
  ) {
    redirect(`/profile/${username}`);
  }

  return (
    <ContainerLayout>
      <RowLayout>
        <ResponsiveWidthContainer>
          <ArticleCategory
            articleCategoryItem={{
              userArticle: true,
              userFavoritedArticle: true,
            }}
          />

          <ArticleList articleList={articleList} />
          <Pagination
            articlesCount={articlesCount}
            currentPage={currentPage}
            href={`/profile/${username}`}
          />
        </ResponsiveWidthContainer>
      </RowLayout>
    </ContainerLayout>
  );
}

type UserArticlePageProps = {
  params: { username: string; articlePage: string };
};
