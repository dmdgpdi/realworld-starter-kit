import {
  articleApi,
  ArticleConstant,
  ArticleContentLayout,
  ArticlePageLayout,
  MainContent,
  SideContent,
} from '@/entities/article';
import { tagApi } from '@/entities/tag';
import {
  ArticleBanner,
  ArticleCategory,
  ArticleList,
  ArticleSideBar,
} from '@/features/article';
import { Pagination } from '@/widgets/pagination';

// TODO: 잘못된 접근(URL ex: /asdf, 더 이상 값이 없는 경우에 예외 처리 필요.)
export default async function Home({ params }: HomeProps) {
  const articlePage = parseInt(params.articlePage, 10);
  const currentPage = Number.isNaN(articlePage) ? 1 : articlePage;

  const { articles: articleList, articlesCount } =
    await articleApi.getArticleList({
      offset: currentPage,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    });

  const { tags: tagList } = await tagApi.getTagList();

  return (
    <ArticlePageLayout>
      <ArticleBanner />

      <ArticleContentLayout>
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
      </ArticleContentLayout>
    </ArticlePageLayout>
  );
}

type HomeProps = {
  params: { articlePage: string };
};
