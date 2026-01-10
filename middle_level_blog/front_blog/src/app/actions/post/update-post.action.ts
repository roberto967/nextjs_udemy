'use server';

import {
  PublicPostForApiDto,
  PublicPostForApiSchema,
  UpdatePostForApiSchema,
} from '@lib/post/schemas';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { updateTag } from 'next/cache';
import { makeRandomString } from '@/utils/make-random-string';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';

type updatePostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: updatePostActionState,
  formData: FormData,
): Promise<updatePostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados de formulário inválidos'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['ID do post é inválido'],
    };
  }

  // const title = formData.get('title')?.toString() || '';
  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePostForApiSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: ['Faça login novamente em outra aba'],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: PublicPostForApiSchema.parse(formDataToObj),
    };
  }

  const newPost = zodParsedObj.data;

  const updatePostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/admin/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(newPost),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!updatePostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: updatePostResponse.errors,
    };
  }

  const post = updatePostResponse.data;

  updateTag('posts');
  updateTag(`post-${post.slug}`);
  // redirect(`/admin/post/${newPost.id}`);

  return {
    formState: PublicPostForApiSchema.parse(post),
    errors: [],
    success: makeRandomString(),
  };
}
