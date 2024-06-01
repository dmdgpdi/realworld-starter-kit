'use client';

import { useShallow } from 'zustand/react/shallow';
import { ERROR_MESSAGE } from '@/shared/constant';
import { CommentDeleteSpan, commentApi } from '@/entities/comment';
import { toastContext } from '@/entities/toast';
import { authServerAction } from '@/entities/auth';

function DeleteCommentIcon({ articleSlug, commentId }: DeleteCommentIconProps) {
  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const deleteComment = async () => {
    try {
      const token = await authServerAction.getAuthCookie();

      if (!token) {
        throw new Error(ERROR_MESSAGE.AUTH_REQUIRED);
      }

      await commentApi.deleteComment(articleSlug, commentId, token);
    } catch (error) {
      if (error instanceof Error) {
        createToast({ message: error.message });
      }
    }
  };

  return <CommentDeleteSpan onClick={deleteComment} />;
}

export { DeleteCommentIcon };

type DeleteCommentIconProps = {
  articleSlug: string;
  commentId: number;
};
