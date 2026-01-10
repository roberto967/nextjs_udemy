'use server';

import { getLoginSessionForApi } from '@/lib/login/manage-login';
import { authenticatedApiRequest } from '@/utils/authenticated-api-request';
import { logColor } from '@/utils/log-color';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

type UploadImageResult = {
  url: string;
  error: string | null;
};

type MakeResultParams = {
  url?: string;
  error?: string;
};

type MakeResultReturn = {
  url: string;
  error: string;
};

export async function uploadImage(
  formData: FormData,
): Promise<UploadImageResult> {
  const makeResult = ({
    url = '',
    error = '',
  }: MakeResultParams): MakeResultReturn => ({ url, error });

  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido' });
  }

  const uploadMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
  if (file.size > uploadMaxSize) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const uploadResponse = await authenticatedApiRequest<{ url: string }>(
    `/upload`,
    {
      method: 'POST',
      body: formData,
    },
  );

  if (!uploadResponse.success) {
    return makeResult({ error: uploadResponse.errors[0] });
  }

  const url = `${process.env.IMAGE_SERVER_URL}${uploadResponse.data.url}`;

  return makeResult({ url });
}

export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    const url = new URL(imageUrl);
    const imagePath = url.pathname;
    const imageFileName = imagePath.split('/').pop();
    if (!imageFileName) {
      throw new Error('Invalid image URL');
    }
    const uploadFullPath = resolve(
      process.cwd(),
      'public',
      process.env.IMAGE_UPLOAD_DIRECTORY!,
      imageFileName,
    );
    await import('fs/promises').then(({ unlink }) => unlink(uploadFullPath));
    logColor(`Imagem deletada: ${imageUrl}`, 'green');
    return true;
  } catch (error) {
    logColor(`Erro ao deletar a imagem: ${error}`, 'red');
    return false;
  }
}
