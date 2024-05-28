'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SubmitButton,
  ErrorMessageUl,
  FieldSet,
  LargeInput,
} from '@/shared/ui';
import {
  authApi,
  authLib,
  authSchema,
  authType,
  useAuthStore,
} from '@/entities/auth';

// TODO: 로그인 중 비밀번호 틀릴 시, 에러. -> 비밀번호 틀렸을 때 에러처리가 없음.
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
  const login = useAuthStore(state => state.login);

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

    login(res.user);
    router.push('/');
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
          <LargeInput
            {...register('email')}
            placeholder="Email"
            autoComplete="email"
          />
        </FieldSet>
        <FieldSet>
          <LargeInput
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
