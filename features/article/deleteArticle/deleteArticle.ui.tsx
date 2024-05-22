'use client';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { ERROR_MESSAGE } from '@/shared/constant';
import { useAuth } from '@/entities/auth';
import { toastContext } from '@/entities/toast';
import { articleApi } from '@/entities/article';

function DeleteArticleButton({ articleSlug }: DeleteArticleButtonProps) {
  const router = useRouter();
  const { token } = useAuth();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const deleteArticle = async () => {
    if (!token) {
      createToast({ message: ERROR_MESSAGE.AUTH_REQUIRED });
      return;
    }

    try {
      await articleApi.deleteArticle(articleSlug, token);
      router.back();
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
      }
    }
  };

  return (
    <CommonButton outLineBorderColor="danger" onClick={deleteArticle}>
      <CommonIcon icon="ion-trash-a"></CommonIcon> Delete Article
    </CommonButton>
  );
}

export { DeleteArticleButton };

type DeleteArticleButtonProps = {
  articleSlug: string;
};
