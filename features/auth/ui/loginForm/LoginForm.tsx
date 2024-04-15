'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ErrorMessageUl,
  FieldSet,
  Input,
  SubmitButton,
  authApi,
  authLib,
  authSchema,
  authType,
} from '@/entities/auth';

export function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<authType.LoginUser>({
    resolver: zodResolver(authSchema.LoginUserSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<authType.LoginUser> = async userData => {
    const res = await authApi.postLoginUser(userData);

    if (authLib.isError(res)) {
      const parsedAuthError = authLib.parseAuthError(res.errors);

      for (const [k, v] of Object.entries(parsedAuthError)) {
        const key = k as keyof authType.LoginUser;
        setError(key, { message: `${k} ${v[0]}` });
      }

      return;
    }

    const { token } = res.user;
    authLib.setClientAuthCookie(token);
    router.refresh();
    return;
  };

  return (
    <>
      <ErrorMessageUl className="error-messages">
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
            {...register('email')}
            placeholder="Email"
            autoComplete="email"
          />
        </FieldSet>
        <FieldSet>
          <Input
            {...register('password')}
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
