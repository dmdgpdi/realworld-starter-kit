import { redirect } from 'next/navigation';
import { ContentPageLayout } from '@/shared/ui';
import {
  articleApi,
  articleLib,
  ArticleConstant,
  ArticlePageLayout,
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
import { authServerAction } from '@/entities/auth';

export default async function ArticleFeedPage({
  params,
}: ArticleFeedPageProps) {
  const currentPage = articleLib.getCorrectPage(params.articlePage);
  const token = await authServerAction.getAuthCookie();

  if (!token) {
    redirect('/');
  }

  const [articleResponse, tagResponse] = await Promise.all([
    articleApi.getFeedList(
      {
        offset: currentPage,
        limit: ArticleConstant.ARTICLES_PER_PAGE,
      },
      token,
    ),
    tagApi.getTagList(),
  ]);
  const { articles: articleList, articlesCount } = articleResponse;
  const { tags: tagList } = tagResponse;

  return (
    <ArticlePageLayout>
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
    </ArticlePageLayout>
  );
}
type ArticleFeedPageProps = {
  params: { articlePage: string };
};
