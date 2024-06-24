'use client';

import { useEffect, useLayoutEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  SubmitButton,
  ErrorMessageUl,
  FieldSet,
  LargeInput,
} from '@/shared/ui';
import { useAuthStore } from '@/entities/auth';
import { loginFormAction } from './login.formAction';

export function LoginForm() {
  const router = useRouter();
  const { login: setLoginState, logout: initLoginState } = useAuthStore(
    state => state,
  );
  const [state, formAction] = useFormState(loginFormAction, {
    isSuccess: false,
    errorList: [],
  });
  const { isSuccess, errorList, token } = state;

  useLayoutEffect(() => {
    initLoginState();
  }, [initLoginState]);

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
      <ErrorMessageUl className="error-messages" data-cy="error-messages">
        {errorList.map(error => (
          <li role="alert" key={error}>
            {error}
          </li>
        ))}
      </ErrorMessageUl>

      <form action={formAction}>
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
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            data-cy="password-input"
          />
        </FieldSet>
        <SubmitButton data-cy="submit">Sign in</SubmitButton>
      </form>
    </>
  );
}
