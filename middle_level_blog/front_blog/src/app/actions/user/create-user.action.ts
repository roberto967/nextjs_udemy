'use server';

import {
  CreateUserSchema,
  PublicUserDto,
  PublicUserSchema,
} from '@/lib/user/schemas';
import { simulateDelay } from '@/utils/async-delay';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
// import axios, { AxiosResponse } from 'axios';

type CreateUserActionState = {
  user: PublicUserDto;
  errors: string[];
  success: boolean;
};

export async function createUserAction(
  state: CreateUserActionState,
  formData: FormData,
): Promise<CreateUserActionState> {
  await simulateDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      user: state.user,
      errors: ['Dados inválidos'],
      success: false,
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const parsedFormData = CreateUserSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      user: PublicUserSchema.parse(formObj),
      errors: getZodErrorMessages(parsedFormData.error.format()),
      success: false,
    };
  }

  // FETCH API
  // const api_url: string = process.env.API_URL!;
  const api_url: string = process.env.API_URL!;

  try {
    const response = await fetch(`${api_url}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedFormData.data),
    });

    const json = await response.json();

    console.log(json);

    if (!response.ok) {
      return {
        user: PublicUserSchema.parse(formObj),
        errors: json.message,
        success: false,
      };
    }

    return {
      user: PublicUserSchema.parse(formObj),
      errors: ['Success'],
      success: true,
    };
  } catch (e) {
    console.log(e);

    return {
      user: PublicUserSchema.parse(formObj),
      errors: ['Falha ao conectar com o servidor.'],
      success: false,
    };
  }
}
