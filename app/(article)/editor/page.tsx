import { RowLayout, ContainerPageLayout } from '@/shared/ui';
import { tagApi } from '@/entities/tag';
import { EditorPageLayout } from '@/entities/auth';
import { CreateArticleForm } from '@/features/article';

export default async function CreateArticlePage() {
  const { tags: tagList } = await tagApi.getTagList();

  return (
    <EditorPageLayout>
      <ContainerPageLayout>
        <RowLayout>
          <CreateArticleForm tagList={tagList} />
        </RowLayout>
      </ContainerPageLayout>
    </EditorPageLayout>
  );
}
