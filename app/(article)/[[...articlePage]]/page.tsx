import { redirect } from 'next/navigation';
import { ContentPageLayout } from '@/shared/ui';
import {
  articleApi,
  articleLib,
  ArticleConstant,
  ArticleListPageLayout,
  MainContent,
  SideContent,
  ArticleBanner,
} from '@/entities/article';
import { tagApi } from '@/entities/tag';
import {
  Pagination,
  ArticleCategory,
  ArticleList,
  ArticleSideBar,
} from '@/widgets';

export default async function Home({ params }: HomeProps) {
  const currentPage = articleLib.getCorrectPage(params.articlePage);
  const offset = currentPage - 1;

  const [articleResponse, tagResponse] = await Promise.all([
    articleApi.getArticleList({
      offset: offset * ArticleConstant.ARTICLES_PER_PAGE,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    }),
    tagApi.getTagList(),
  ]);
  const { articles: articleList, articlesCount } = articleResponse;
  const { tags: tagList } = tagResponse;

  if (
    offset != 0 &&
    articlesCount <= ArticleConstant.ARTICLES_PER_PAGE * offset
  ) {
    redirect('/');
  }

  return (
    <ArticleListPageLayout>
      <ArticleBanner />
      <ContentPageLayout>
        <MainContent>
          <ArticleCategory />
          <ArticleList articleList={articleList} />
          <Pagination
            href=""
            currentPage={currentPage}
            articlesCount={articlesCount}
          />
        </MainContent>

        <SideContent>
          <ArticleSideBar tagList={tagList} />
        </SideContent>
      </ContentPageLayout>
    </ArticleListPageLayout>
  );
}

type HomeProps = {
  params: { articlePage: string };
};
