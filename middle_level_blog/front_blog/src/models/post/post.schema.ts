import { PublicUserDto } from '@/lib/user/schemas';
import { z } from 'zod';

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  coverImageUrl: z.string(),
  published: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  author: z.string(),
});

export const PostsSchema = z.object({
  posts: z.array(PostSchema),
});

export type PostModelFromApi = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: PublicUserDto;
};
