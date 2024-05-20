import { ContainerLayout, LogoFont } from '@/shared/ui';
import { ArticleBannerLayout } from '../article.ui';

function ArticleBanner() {
  return (
    <ArticleBannerLayout>
      <ContainerLayout>
        <LogoFont>conduit</LogoFont>
        <p>A place to share your knowledge.</p>
      </ContainerLayout>
    </ArticleBannerLayout>
  );
}

export { ArticleBanner };
