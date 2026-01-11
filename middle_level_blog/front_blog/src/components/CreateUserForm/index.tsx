'use client';

import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { EyeClosedIcon, EyeIcon, UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../Button';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PublicUserSchema } from '@/lib/user/schemas';
import { createUserAction } from '@actions/user/create-user.action';
import { HoneypotInput } from '../HoneypotInput';

export function CreateUserForm() {
  const [isVisiblePassword, setVisiblePassword] = useState(false);

  const [state, action, isPending] = useActionState(createUserAction, {
    user: PublicUserSchema.parse({}),
    errors: [],
    success: false,
  });

  useEffect(() => {
    toast.dismiss();
    if (state.errors.length > 0) {
      state.errors.forEach(error => toast.error(error));
    }
  }, [state]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        'text-center max-w-sm mt-16 mb-32 mx-auto',
      )}
    >
      <form action={action} className='flex-1 flex flex-col gap-6'>
        <InputText
          type='text'
          name='name'
          labelText='Nome'
          placeholder='Seu nome'
          disabled={isPending}
          defaultValue={state.user.name}
          required
        />
        <InputText
          type='email'
          name='email'
          labelText='E-mail'
          placeholder='Sua e-mail'
          disabled={isPending}
          defaultValue={state.user.email}
          required
        />
        <div className='grid grid-cols-[1fr_auto] items-end gap-2'>
          <InputText
            type={isVisiblePassword ? 'text' : 'password'}
            name='password'
            labelText='Senha'
            placeholder='Sua senha'
            disabled={isPending}
            required
          />
          <button
            type='button'
            className={`cursor-pointer mb-2 transition`}
            onClick={() => setVisiblePassword(prev => !prev)}
          >
            <span>{isVisiblePassword ? <EyeIcon /> : <EyeClosedIcon />}</span>
          </button>
        </div>

        <InputText
          type={isVisiblePassword ? 'text' : 'password'}
          name='password2'
          labelText='Repetir senha'
          placeholder='Sua senha novamente'
          disabled={isPending}
          required
        />

        <HoneypotInput />

        <Button disabled={false} type='submit' className='mt-4'>
          <UserRoundIcon />
          {!isPending && 'Criar conta'}
          {isPending && 'Criando...'}
        </Button>

        <p className='text-sm/tight'>
          <Link href='/login'>Já tem conta? Entrar</Link>
        </p>
      </form>
    </div>
  );
}
