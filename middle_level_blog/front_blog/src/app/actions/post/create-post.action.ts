'use server';

import { PostCreateSchema } from '@lib/post/schemas';
import { makePartialPublicPost, PublicPost } from '@/dto/post/post.dto';
import { verifyLoginSession } from '@/lib/login/manage-login';
import { PostModel } from '@/models/post/post.model';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeSlugFromText } from '@/utils/make-slug-from-text';
import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuid } from 'uuid';

type createPostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function createPostAction(
  prevState: createPostActionState,
  formData: FormData,
): Promise<createPostActionState> {
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados de formulário inválidos'],
    };
  }

  if (!isAuthenticated) {
    return {
      formState: prevState.formState,
      errors: ['Faça login novamente em outra aba'],
    };
  }

  // const title = formData.get('title')?.toString() || '';
  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      formState: makePartialPublicPost(formDataToObj),
      errors: errors,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    id: uuid(),
    slug: makeSlugFromText(validPostData.title),
  };

  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }

  updateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
