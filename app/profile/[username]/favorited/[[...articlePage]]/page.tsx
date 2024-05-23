import {
  ContainerLayout,
  ResponsiveWidthContainer,
  RowLayout,
} from '@/shared/ui';
import { decodeUrl } from '@/shared/lib';
import { ArticleConstant, articleApi, articleLib } from '@/entities/article';
import { ArticleCategory, ArticleList, Pagination } from '@/widgets';

export default async function UserFavoritedArticlePage({
  params,
}: UserFavoritedArticlePageProps) {
  const currentPage = articleLib.getCorrectPage(params.articlePage);
  const offset = currentPage - 1;
  const username = decodeUrl(params.username);

  const { articles: articleList, articlesCount } =
    await articleApi.getArticleList({
      favorited: username,
      offset: offset * ArticleConstant.ARTICLES_PER_PAGE,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    });

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

type UserFavoritedArticlePageProps = {
  params: { username: string; articlePage: string };
};
