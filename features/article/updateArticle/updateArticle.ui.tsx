'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  ErrorMessageUl,
  FieldSet,
  LargeInput,
  Input,
  SubmitButton,
  ResponsiveWidthContainer,
  TextArea,
} from '@/shared/ui';
import { articleTypes } from '@/entities/article';
import { useAuthStore } from '@/entities/auth';
import { updateArticleAction } from './updateArticle.serverAction';

function UpdateArticleForm({ article, hashValue }: UpdateArticleFormProps) {
  const router = useRouter();
  const { title, description, body, slug } = article;
  const userInfo = useAuthStore(state => state.userInfo);
  const [state, formAction] = useFormState(updateArticleAction, {
    token: userInfo?.token,
    isSuccess: false,
    errorList: [],
  });
  const { isSuccess, errorList } = state;

  useEffect(() => {
    if (isSuccess === true) {
      router.replace('/');
      return;
    }
  }, [isSuccess, router]);

  return (
    <ResponsiveWidthContainer>
      <ErrorMessageUl>
        {errorList.map(error => (
          <li role="alert" key={error}>
            {error}
          </li>
        ))}
      </ErrorMessageUl>

      <form action={formAction}>
        <fieldset>
          <FieldSet>
            <LargeInput
              type="text"
              placeholder="Article Title"
              name="title"
              defaultValue={title}
            />
          </FieldSet>
          <FieldSet>
            <Input
              placeholder="What's this article about?"
              name="description"
              defaultValue={description}
            />
          </FieldSet>
          <>
            <TextArea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              name="body"
              defaultValue={body}
            ></TextArea>
          </>
          <Input type="hidden" name="slug" value={slug} />
          <Input type="hidden" name="hash" value={hashValue} />
          <SubmitButton>Publish Article</SubmitButton>
        </fieldset>
      </form>
    </ResponsiveWidthContainer>
  );
}

export { UpdateArticleForm };

type UpdateArticleFormProps = {
  article: articleTypes.ArticleType;
  hashValue: string;
};
