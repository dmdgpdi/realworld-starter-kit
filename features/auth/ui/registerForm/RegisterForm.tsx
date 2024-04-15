'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { API } from '@/shared/api';
import { FieldSet, Input, SubmitButton, ErrorMessageUl } from '@/entities/auth';
import { authSchema, authType, authApi } from '@/entities/auth';

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
  };

  return (
    <>
      <ErrorMessageUl>
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
          <Input
            {...register('username', {
              required: 'Username을 입력해주세요.',
            })}
            placeholder="Username"
          />
        </FieldSet>
        <FieldSet>
          <Input
            {...register('email', { required: 'Email을 입력해주세요.' })}
            placeholder="Email"
            autoComplete="email"
          />
        </FieldSet>
        <FieldSet>
          <Input
            {...register('password', {
              required: 'Password를 입력해주세요.',
            })}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </FieldSet>
        <SubmitButton>Sign up</SubmitButton>
      </form>
    </>
  );
}
