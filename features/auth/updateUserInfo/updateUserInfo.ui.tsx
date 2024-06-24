'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  ErrorMessageUl,
  FieldSet,
  Input,
  LargeInput,
  SubmitButton,
  TextArea,
} from '@/shared/ui';
import { useAuthStore } from '@/entities/auth';
import { updateUserInfoAction } from './updateUserInfo.serverAction';

function UpdateUserInfoForm() {
  const router = useRouter();
  const setLoginState = useAuthStore(state => state.login);
  const [state, formAction] = useFormState(updateUserInfoAction, {
    isSuccess: false,
    errorList: [],
  });
  const { isSuccess, errorList, token } = state;

  useEffect(() => {
    const onSuccess = async () => {
      if (isSuccess) {
        await setLoginState(token);
        router.push('/');
        return;
      }
    };

    onSuccess();
  }, [isSuccess, router, setLoginState, token]);

  return (
    <>
      <ErrorMessageUl data-cy="error-messages">
        {errorList.map(error => (
          <li key={error}>{error}</li>
        ))}
      </ErrorMessageUl>

      <form action={formAction}>
        <fieldset>
          <FieldSet>
            <Input
              name="imageUrl"
              placeholder="URL of profile picture"
              data-cy="image-url-input"
            />
          </FieldSet>
          <FieldSet>
            <LargeInput
              name="username"
              placeholder="Your Name"
              data-cy="username-input"
            />
          </FieldSet>
          <FieldSet>
            <TextArea
              name="bio"
              placeholder="Short bio about you"
              data-cy="bio-input"
            ></TextArea>
          </FieldSet>
          <FieldSet>
            <LargeInput
              name="email"
              placeholder="Email"
              autoComplete="email"
              data-cy="email-input"
            />
          </FieldSet>
          <FieldSet>
            <LargeInput
              type="password"
              name="password"
              placeholder="New Password"
              autoComplete="new-password"
              data-cy="password-input"
            />
          </FieldSet>
          <SubmitButton data-cy="submit">Update Settings</SubmitButton>
        </fieldset>
      </form>
    </>
  );
}

export { UpdateUserInfoForm };
