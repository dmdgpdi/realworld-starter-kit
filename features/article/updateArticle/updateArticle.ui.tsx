'use client';

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
import { updateArticleAction } from './updateArticle.serverAction';

function UpdateArticleForm({ article, hashValue }: UpdateArticleFormProps) {
  const router = useRouter();
  const { title, description, body, slug } = article;
  const [state, formAction] = useFormState(updateArticleAction, {
    isSuccess: false,
    errorList: [],
  });
  const { isSuccess, errorList } = state;

  if (isSuccess === true) {
    router.replace('/');
    return;
  }

  return (
    <ResponsiveWidthContainer>
      <ErrorMessageUl data-cy="error-messages">
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
              data-cy="title-input"
            />
          </FieldSet>
          <FieldSet>
            <Input
              placeholder="What's this article about?"
              name="description"
              defaultValue={description}
              data-cy="description-input"
            />
          </FieldSet>
          <>
            <TextArea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              name="body"
              defaultValue={body}
              data-cy="body-input"
            ></TextArea>
          </>
          <Input type="hidden" name="slug" value={slug} />
          <Input type="hidden" name="hash" value={hashValue} />
          <SubmitButton data-cy="submit-button">Publish Article</SubmitButton>
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
