import { PostModelFromApi } from '@/models/post/post.schema';
import { ApiRequest, apiRequest } from '@/utils/api-request';
import { cacheTag } from 'next/cache';
import { cache } from 'react';

// export const findAllPublicPostsCached = cache(
//   async function findAllPublicPostsCached() {
//     'use cache';
//     cacheTag('posts');

//     return await postRepository.findAllPublic();
//   },
// );

export const findAllPublicPostsByApiCached = cache(
  async function findAllPublicPostsCached() {
    'use cache';
    cacheTag('posts');

    const postsResponse = await apiRequest<PostModelFromApi[]>(`/post`, {
      next: {
        tags: ['posts'],
        revalidate: 86400,
      },
    });

    return postsResponse;
  },
);

// export const findPublicPostBySlugCached = cache(
//   async function findPublicPostBySlugCached(slug: string): Promise<PostModel> {
//     'use cache';
//     cacheTag(`post-${slug}`);

//     const post = await postRepository.findBySlugPublic(slug).catch(() => null);

//     if (!post) {
//       console.log('Erro');
//       notFound();
//     }

//     return post;
//   },
// );

export const findPublicPostBySlugFromApiCached = cache(
  async function findPublicPostBySlugCached(
    slug: string,
  ): Promise<ApiRequest<PostModelFromApi>> {
    'use cache';
    cacheTag(`post-${slug}`);

    const postsResponse = await apiRequest<PostModelFromApi>(`/post/${slug}`, {
      next: {
        tags: [`post-${slug}`],
        revalidate: 86400,
      },
    });

    return postsResponse;
  },
);
