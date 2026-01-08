'use server';

import {
  // createLoginSession,
  createLoginSessionFromApi,
  // verifyPassword,
} from '@/lib/login/manage-login';
import { LoginSchema } from '@/lib/login/schemas';
import { apiRequest } from '@/utils/api-request';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
// import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  email: string;
  errors: string[];
};

export async function loginAction(
  _state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      email: '',
      errors: ['Login not allowed'],
    };
  }

  // await asyncDelay(5000); // Vou manter

  if (!(formData instanceof FormData)) {
    return {
      email: '',
      errors: ['Dados inválidos'],
    };
  }

  // validação
  const formObj = Object.fromEntries(formData.entries());
  const formEmail = formObj?.email?.toString() || '';
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      email: formEmail,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    '/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    },
  );

  if (!loginResponse.success) {
    return {
      errors: ['Usuário ou senha inválidos'],
      email: formEmail,
    };
  }

  console.log(loginResponse.data);

  await createLoginSessionFromApi(loginResponse.data.accessToken);

  redirect('/admin/post');
}
