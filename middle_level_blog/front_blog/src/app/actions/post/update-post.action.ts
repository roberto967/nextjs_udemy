'use server';

import { PostUpdateSchema } from '@lib/post/schemas';
import { makePartialPublicPost, PublicPost } from '@/dto/post/post.dto';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { updateTag } from 'next/cache';
import { makeRandomString } from '@/utils/make-random-string';
import { verifyLoginSession } from '@/lib/login/manage-login';

type updatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: updatePostActionState,
  formData: FormData,
): Promise<updatePostActionState> {
  const isAuthenticated = await verifyLoginSession();

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
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Faça login novamente em outra aba'],
    };
  }

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: errors,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;

  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPublicPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: ['Erro desconhecido'],
    };
  }

  updateTag('posts');
  updateTag(`post-${post.slug}`);
  // redirect(`/admin/post/${newPost.id}`);

  return {
    formState: makePartialPublicPost(post),
    errors: [],
    success: makeRandomString(),
  };
}
