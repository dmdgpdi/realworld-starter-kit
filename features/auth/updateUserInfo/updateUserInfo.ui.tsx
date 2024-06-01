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
        router.replace('/');
        return;
      }
    };

    onSuccess();
  }, [isSuccess, router, setLoginState, token]);

  return (
    <>
      <ErrorMessageUl>
        {errorList.map(error => (
          <li key={error}>{error}</li>
        ))}
      </ErrorMessageUl>

      <form action={formAction}>
        <fieldset>
          <FieldSet>
            <Input name="imageUrl" placeholder="URL of profile picture" />
          </FieldSet>
          <FieldSet>
            <LargeInput name="username" placeholder="Your Name" />
          </FieldSet>
          <FieldSet>
            <TextArea name="bio" placeholder="Short bio about you"></TextArea>
          </FieldSet>
          <FieldSet>
            <LargeInput name="email" placeholder="Email" autoComplete="email" />
          </FieldSet>
          <FieldSet>
            <LargeInput
              type="password"
              name="password"
              placeholder="New Password"
              autoComplete="new-password"
            />
          </FieldSet>
          <SubmitButton>Update Settings</SubmitButton>
        </fieldset>
      </form>
    </>
  );
}

export { UpdateUserInfoForm };
