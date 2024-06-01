'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useParams } from 'next/navigation';
import { BASE_IMAGE_URL } from '@/shared/constant';
import {
  CommentAuthorImage,
  CommentCardBlock,
  CommentCardFooter,
  CommentFormLayout,
  CommentInput,
  CommentSubmitButton,
} from '@/entities/comment';
import { toastContext } from '@/entities/toast';
import { useAuthStore } from '@/entities/auth';
import { createCommentFormAction } from './createComment.serverAction';

function CommentForm() {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const userInfo = useAuthStore(state => state.userInfo);
  const authorURL = userInfo?.image ?? BASE_IMAGE_URL;
  const [formState, formAction] = useFormState(createCommentFormAction, {
    articleSlug,
    isSuccess: true,
    errorList: [],
  });
  const { isSuccess, errorList } = formState;
  const inputNode = useRef<HTMLTextAreaElement>(null);

  const createToast = toastContext.useToastStore(state => state.createToast);

  useEffect(() => {
    if (0 < errorList.length) {
      errorList.forEach(errorMessage => createToast({ message: errorMessage }));
    }
  }, [errorList, createToast]);

  useEffect(() => {
    if (inputNode.current && isSuccess === true) {
      inputNode.current.value = '';
    }
  }, [isSuccess]);

  return (
    <>
      <CommentFormLayout action={formAction}>
        <CommentCardBlock>
          <CommentInput name="comment" ref={inputNode} />
        </CommentCardBlock>
        <CommentCardFooter>
          <CommentAuthorImage src={authorURL} alt="comment-author-img" />
          <CommentSubmitButton>Post Comment</CommentSubmitButton>
        </CommentCardFooter>
        <input type="hidden" value={articleSlug} name="articleSlug" />
      </CommentFormLayout>
    </>
  );
}

export { CommentForm };
