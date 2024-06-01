'use client';

import { useRouter } from 'next/navigation';
import { useShallow } from 'zustand/react/shallow';
import { CommonButton, CommonIcon } from '@/shared/ui';
import { ERROR_MESSAGE } from '@/shared/constant';
import { toastContext } from '@/entities/toast';
import { articleApi } from '@/entities/article';
import { authServerAction } from '@/entities/auth';

function DeleteArticleButton({ articleSlug }: DeleteArticleButtonProps) {
  const router = useRouter();
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const deleteArticle = async () => {
    try {
      const token = await authServerAction.getAuthCookie();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

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
