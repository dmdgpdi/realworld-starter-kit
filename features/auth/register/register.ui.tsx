'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API } from '@/shared/api';
import { authSchema, authType, authApi } from '@/entities/auth';
import {
  ErrorMessageUl,
  FieldSet,
  LargeInput,
  SubmitButton,
} from '@/shared/ui';

export function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<authType.CreateUser>({
    resolver: zodResolver(authSchema.CreateUserSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<authType.CreateUser> = async userData => {
    try {
      const error = await authApi.postRegisterUser(userData);

      if (error == undefined) {
        router.push(`/${API.LOGIN}`);
        return;
      }

      for (const [k, v] of Object.entries(error)) {
        const key = k as keyof authType.CreateUser;

        v.forEach(value => {
          setError(key, { message: `${key} ${value}` });
        });
      }
    } catch (e) {
      if (e instanceof Error) {
        setError('email', {
          message: 'Something is wrong. Please retry again.',
        });
      }
    }
  };

  return (
    <>
      <ErrorMessageUl data-cy="error-messages">
        {errors?.username && (
          <li id="username-error-message" role="alert">
            {errors.username.message}
          </li>
        )}

        {errors?.email && (
          <li id="email-error-message" role="alert">
            {errors.email.message}
          </li>
        )}

        {errors?.password && (
          <li id="password-error-message" role="alert">
            {errors.password.message}
          </li>
        )}
      </ErrorMessageUl>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <FieldSet>
          <LargeInput
            {...register('username', {
              required: 'Username을 입력해주세요.',
            })}
            placeholder="Username"
            data-cy="username-input"
          />
        </FieldSet>
        <FieldSet>
          <LargeInput
            {...register('email', { required: 'Email을 입력해주세요.' })}
            placeholder="Email"
            autoComplete="email"
            data-cy="email-input"
          />
        </FieldSet>
        <FieldSet>
          <LargeInput
            {...register('password', {
              required: 'Password를 입력해주세요.',
            })}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            data-cy="password-input"
          />
        </FieldSet>
        <SubmitButton data-cy="submit">Sign up</SubmitButton>
      </form>
    </>
  );
}
