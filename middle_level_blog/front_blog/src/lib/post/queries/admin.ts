import { PostModel } from '@/models/post/post.model';
import { PostModelFromApi } from '@/models/post/post.schema';
import { postRepository } from '@/repositories/post';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { cache } from 'react';

export const findPostByIdAdmin = cache(async function findPostByIdAdmin(
  id: string,
): Promise<PostModel> {
  return await postRepository.findById(id);
});

export const findAllPostAdmin = cache(async () => {
  return postRepository.findAll();
});

export const findAllPostFromApiAdmin = cache(async () => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi[]>(
    `/post/me/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});

export const findPostByIdFromApiAdmin = cache(async (id: string) => {
  const postsResponse = await authenticatedApiRequest<PostModelFromApi>(
    `/post/me/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  return postsResponse;
});
