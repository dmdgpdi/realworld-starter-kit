'use client';

import {
  CommentAuthorImage,
  CommentCardBlock,
  CommentCardFooter,
  CommentFormLayout,
  CommentInput,
  CommentSubmitButton,
} from '@/entities/comment';
import { toastContext } from '@/entities/toast';
import { useShallow } from 'zustand/react/shallow';
import { useAuth } from '@/entities/auth';
import { BASE_IMAGE_URL } from '@/shared/constant';
import { useFormState } from 'react-dom';
import { postComment } from './createComment.serverAction';
import { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

function CommentForm() {
  const { articleTitle } = useParams<{ articleTitle: string }>();
  const { userInformation } = useAuth();
  const authorURL = userInformation?.image ?? BASE_IMAGE_URL;
  const inputNode = useRef<HTMLTextAreaElement>(null);

  const createToast = toastContext.useToastStore(
    useShallow(state => state.createToast),
  );

  const [state, formAction] = useFormState(postComment, undefined);

  useEffect(() => {
    if (state?.message) {
      createToast({ message: state.message });
    }
  }, [state, createToast]);

  useEffect(() => {
    if (inputNode.current && state?.success === true) {
      inputNode.current.value = '';
    }
  }, [state]);

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
        <input type="hidden" value={articleTitle} name="articleTitle" />
      </CommentFormLayout>
    </>
  );
}

export { CommentForm };
