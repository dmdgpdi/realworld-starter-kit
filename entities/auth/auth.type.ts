import { z } from 'zod';
import {
  CreateUserSchema,
  LoginResponseSchema,
  LoginUserSchema,
} from './auth.schema';

type CreateUser = z.infer<typeof CreateUserSchema>;

type LoginUser = z.infer<typeof LoginUserSchema>;

type LoginUserErrorMessage = {
  errors: {
    string: string[];
  };
};

type LoginUserResponse = z.infer<typeof LoginResponseSchema>;

type AuthError = Partial<Record<keyof CreateUser, string[]>>;

type AuthErrorResponse = {
  errors: AuthError;
};

type UserInfor = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string;
};

type UserInforResponse = {
  user: UserInfor;
};

export type {
  CreateUser,
  LoginUser,
  LoginUserErrorMessage,
  LoginUserResponse,
  AuthError,
  AuthErrorResponse,
  UserInforResponse,
};
