type ApiRequestError = {
  errors: string[];
  success: false;
  status: number;
};

type ApiRequestSuccess<T> = {
  data: T;
  success: true;
  status: number;
};

export type ApiRequest<T> = ApiRequestError | ApiRequestSuccess<T>;

export const apiUrl: string = process.env.API_URL!;

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<ApiRequest<T>> {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, options);
    const json = await response.json().catch(() => null);

    if (!response.ok) {
      const errors = Array.isArray(json?.message)
        ? json.message
        : [json.message || 'Erro inesperado'];

      return {
        errors,
        success: false,
        status: response.status,
      };
    }

    return {
      data: json,
      success: true,
      status: response.status,
    };
  } catch (error) {
    console.log(error);

    return {
      errors: ['Erro ao conectar com o servidor.'],
      success: false,
      status: 500,
    };
  }
}
