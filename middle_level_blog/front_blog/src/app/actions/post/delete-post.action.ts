'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { PublicPostForApiDto } from '@/lib/post/schemas';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
// import { verifyLoginSession } from '@/lib/login/manage-login';
// import { postRepository } from '@/repositories/post';
import { updateTag } from 'next/cache';

type DeletePostActionResult = {
  errors: string[];
};

export async function deletePostAction(
  id: string,
): Promise<DeletePostActionResult> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return {
      errors: ['Faça login novamente em outra aba'],
    };
  }

  if (!id || typeof id !== 'string') {
    return {
      errors: ['Dados inválidos'],
    };
  }

  const deletePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/admin/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  if (!deletePostResponse.success) {
    return {
      errors: deletePostResponse.errors,
    };
  }

  updateTag('posts');
  updateTag(`post-${deletePostResponse.data.slug}`);

  return {
    errors: [],
  };
}
