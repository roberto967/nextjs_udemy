'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { updateTag } from 'next/cache';

type AttPostsActionState = {
  error?: string;
};

export async function attPostsAction(): Promise<AttPostsActionState | void> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return {
      error: 'Faça login novamente em outra aba',
    };
  }

  updateTag('posts');
}
