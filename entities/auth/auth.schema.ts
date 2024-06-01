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

const UpdateUserRequestSchema = z
  .object({
    email: z.string().email({ message: 'Please enter your email.' }),

    password: z
      .string()
      .trim()
      .min(4, { message: 'Please enter at least 4 digits of the password.' }),

    username: z
      .string()
      .trim()
      .min(4, { message: 'Please enter at least 4 digits of the username.' }),

    bio: z
      .string()
      .trim()
      .min(1, { message: 'Please enter at least 1 digits of the bio.' }),

    image: z.string().url({ message: 'Please enter your image url' }),
  })
  .partial()
  .refine(
    data => {
      const keyList = Object.keys(data) as (keyof typeof data)[];
      const hasAtLeastOneField = keyList.some(key => data[key] !== undefined);
      return hasAtLeastOneField;
    },
    { message: 'At least one field must be provided.' },
  );

export {
  CreateUserSchema,
  LoginUserSchema,
  LoginResponseSchema,
  UpdateUserRequestSchema,
};
