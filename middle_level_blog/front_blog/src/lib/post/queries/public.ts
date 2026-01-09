import { PostModel } from '@/models/post/post.model';
import { postRepository } from '@/repositories/post';
import { cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublicPostsCached = cache(
  async function findAllPublicPostsCached() {
    'use cache';
    cacheTag('posts');

    return await postRepository.findAllPublic();
  },
);

export const findPublicPostBySlugCached = cache(
  async function findPublicPostBySlugCached(slug: string): Promise<PostModel> {
    'use cache';
    cacheTag(`post-${slug}`);

    const post = await postRepository.findBySlugPublic(slug).catch(() => null);

    if (!post) {
      console.log('Erro');
      notFound();
    }

    return post;
  },
);
