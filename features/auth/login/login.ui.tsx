'use client';

import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  SubmitButton,
  ErrorMessageUl,
  FieldSet,
  LargeInput,
} from '@/shared/ui';
import { loginFormAction } from './login.formAction';

export function LoginForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(loginFormAction, {
    isSuccess: false,
    errorList: [],
  });
  const { isSuccess, errorList } = state;

  useEffect(() => {
    if (isSuccess) {
      router.replace('/');
      return;
    }
  }, [isSuccess, router]);

  return (
    <>
      <ErrorMessageUl className="error-messages">
        {errorList.map(error => (
          <li role="alert" key={error}>
            {error}
          </li>
        ))}
      </ErrorMessageUl>

      <form action={formAction}>
        <FieldSet>
          <LargeInput name="email" placeholder="Email" autoComplete="email" />
        </FieldSet>
        <FieldSet>
          <LargeInput
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </FieldSet>
        <SubmitButton>Sign in</SubmitButton>
      </form>
    </>
  );
}
