import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .check(z.trim(), z.email({ message: 'E-mail inválido' }), z.toLowerCase()),
  password: z
    .string()
    .trim()
    .min(3, 'Senha precisa ter um mínimo de 3 caracteres'),
});
