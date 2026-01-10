'use server';

import {
  CreatePostForApiSchema,
  PublicPostForApiDto,
  PublicPostForApiSchema,
} from '@lib/post/schemas';
import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { redirect } from 'next/navigation';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { updateTag } from 'next/cache';

type createPostActionState = {
  formState: PublicPostForApiDto;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: createPostActionState,
  formData: FormData,
): Promise<createPostActionState> {
  const isAuthenticated = await getLoginSessionForApi();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados de formulário inválidos'],
    };
  }

  // const title = formData.get('title')?.toString() || '';
  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = CreatePostForApiSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: prevState.formState,
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

  const createPostResponse = await authenticatedApiRequest<PublicPostForApiDto>(
    `/post/me`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    },
  );

  if (!createPostResponse.success) {
    return {
      formState: PublicPostForApiSchema.parse(formDataToObj),
      errors: createPostResponse.errors,
    };
  }

  const createdPost = createPostResponse.data;

  updateTag('posts');
  redirect(`/admin/post/${createdPost.id}?created=1`);
}
