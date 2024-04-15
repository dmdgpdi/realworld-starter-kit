import { z } from 'zod';

const CreateUserSchema = z.object({
  username: z
    .string()
    .trim()
    .min(4, { message: 'Please enter at least 4 digits of the username.' }),
  email: z.string().email({ message: 'Please match the email format.' }),
  password: z
    .string()
    .trim()
    .min(4, { message: 'Please enter at least 4 digits of the password.' }),
});

const LoginUserSchema = z.object({
  email: z.string().email({ message: 'Please enter your email.' }),
  password: z
    .string()
    .trim()
    .min(4, { message: 'Please enter at least 4 digits of the password.' }),
});

const LoginResponseSchema = z.object({
  user: z.object({
    email: z.string().email(),
    token: z.string(),
    username: z.string(),
    bio: z.nullable(z.string()),
    image: z.string().url(),
  }),
});

export { CreateUserSchema, LoginUserSchema, LoginResponseSchema };
