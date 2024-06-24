'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  ErrorMessageUl,
  FieldSet,
  LargeInput,
  Input,
  SubmitButton,
  ResponsiveWidthContainer,
  CommonIcon,
  TextArea,
} from '@/shared/ui';
import { tagType } from '@/entities/tag';
import { articleLib } from '@/entities/article';
import { TagListLayout, TagSpan } from '@/entities/tag';
import { createArticleAction } from './createArticle.serverAction';

function CreateArticleForm({ tagList }: CreateArticleFormProps) {
  const router = useRouter();
  const [state, formAction] = useFormState(createArticleAction, {
    isSuccess: false,
    errorList: [],
  });
  const [tagInputValue, setTagInputValue] = useState('');
  const { isSuccess, errorList } = state;
  const { addText, deleteText } = articleLib;

  if (isSuccess === true) {
    router.replace('/');
    return;
  }

  const addTag = (tag: tagType.Tag) => {
    setTagInputValue(prev => addText(prev, tag));
  };

  const deleteTag = (tag: tagType.Tag) => {
    setTagInputValue(prevValue => deleteText(prevValue, tag));
  };

  const toggleTag = (tag: tagType.Tag) => {
    const hasTag = tagInputValue.includes(tag);

    if (hasTag) {
      return deleteTag(tag);
    } else {
      return addTag(tag);
    }
  };

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
              data-cy="title-input"
            />
          </FieldSet>
          <FieldSet>
            <Input
              placeholder="What's this article about?"
              name="description"
              data-cy="description-input"
            />
          </FieldSet>
          <FieldSet>
            <TextArea
              className="form-control"
              rows={8}
              placeholder="Write your article (in markdown)"
              name="body"
              data-cy="body-input"
            ></TextArea>
          </FieldSet>
          <FieldSet>
            <Input
              placeholder="Click tags"
              name="tags"
              readOnly
              value={tagInputValue}
            />
            <TagListLayout>
              {tagList.map(tag => (
                <TagSpan
                  key={tag}
                  onClick={() => {
                    toggleTag(tag);
                  }}
                  data-cy={`tag-${tag}`}
                >
                  {' '}
                  <CommonIcon icon="ion-close-round"></CommonIcon> {tag}{' '}
                </TagSpan>
              ))}
            </TagListLayout>
          </FieldSet>
          <SubmitButton data-cy="submit-button">Publish Article</SubmitButton>
        </fieldset>
      </form>
    </ResponsiveWidthContainer>
  );
}

export { CreateArticleForm };

type CreateArticleFormProps = {
  tagList: tagType.Tag[];
};
