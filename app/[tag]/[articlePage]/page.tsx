import { ContentPageLayout } from '@/shared/ui';
import {
  ArticleConstant,
  ArticlePageLayout,
  MainContent,
  SideContent,
  articleApi,
} from '@/entities/article';
import { tagApi } from '@/entities/tag';
import { Tag } from '@/entities/tag/tag.type';
import {
  ArticleBanner,
  ArticleCategory,
  ArticleList,
  ArticleSideBar,
} from '@/features/article';
import { Pagination } from '@/widgets/pagination';

// TODO: 올바르지 않은 tag가 들어올 때 예외처리
// TODO: TAG 여러개가 들어올 떄 예외처리
export default async function ArticleTagPage({ params }: ArticleTagPageProps) {
  const articlePage = parseInt(params.articlePage, 10);
  const currentPage = Number.isNaN(articlePage) ? 1 : articlePage;
  const tag = params.tag;

  // TODO: 비동기 처리 동시에 실행하기.
  const { articles: articleList, articlesCount } =
    await articleApi.getArticleList({
      tag,
      offset: currentPage,
      limit: ArticleConstant.ARTICLES_PER_PAGE,
    });

  const { tags: tagList } = await tagApi.getTagList();

  return (
    <ArticlePageLayout>
      <ArticleBanner />

      <ContentPageLayout>
        <MainContent>
          <ArticleCategory />
          <ArticleList articleList={articleList} />
          <Pagination
            href={`/${tag}`}
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

type ArticleTagPageProps = {
  params: { articlePage: string; tag: Tag };
};
