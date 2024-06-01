import { z } from 'zod';
import {
  CreateUserSchema,
  LoginResponseSchema,
  LoginUserSchema,
  UpdateUserRequestSchema,
} from './auth.schema';

type CreateUser = z.infer<typeof CreateUserSchema>;

type LoginUser = z.infer<typeof LoginUserSchema>;

type LoginUserResponse = z.infer<typeof LoginResponseSchema>;

type AuthError = Partial<Record<keyof CreateUser, string[]>>;

type AuthErrorResponse = {
  errors: AuthError;
};

type User = {
  email: string;
  token: string;
  username: string;
  bio: string | null;
  image: string;
};

type UserInforResponse = {
  user: User;
};

type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>;

export type {
  CreateUser,
  LoginUser,
  LoginUserResponse,
  AuthError,
  AuthErrorResponse,
  UserInforResponse,
  User,
  UpdateUserRequest,
};
