import { z } from 'zod';

const ArticleRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: 'Please enter at least 5 digits of the title.' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Please enter a description.' })
    .max(100, {
      message: 'Please write the description in 100 characters or less.',
    }),
  body: z
    .string()
    .trim()
    .min(5, { message: 'Please enter a main article.' })
    .max(5000, {
      message: 'Please write the main article in 5000 characters or less.',
    }),
  tagList: z
    .array(z.string())
    .nonempty({ message: 'Please enter a tag' })
    .max(10, {
      message: 'Please select no more than 10 tags.',
    }),
});

const UpdateArticleRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: 'Please enter at least 5 digits of the title.' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Please enter a description.' })
    .max(100, {
      message: 'Please write the description in 100 characters or less.',
    }),
  body: z
    .string()
    .trim()
    .min(5, { message: 'Please enter at least 5 digits of the main article.' })
    .max(5000, {
      message: 'Please write the main article in 5000 characters or less.',
    }),
});

export { ArticleRequestSchema, UpdateArticleRequestSchema };
