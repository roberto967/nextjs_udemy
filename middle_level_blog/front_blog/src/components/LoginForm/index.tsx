'use client';

import { loginAction } from '@/app/actions/login/login.action';
import { Button } from '@/components/Button';
import { InputText } from '@/components/InputText';
import clsx from 'clsx';
import { EyeClosedIcon, EyeIcon, LogInIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState: {
    email: string;
    errors: string[];
  } = {
    email: '',
    errors: [],
  };

  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.errors && state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => {
        toast.error(error);
      });
    }
  }, [state]);

  const [isVisiblePassword, setVisiblePassword] = useState(false);

  // parametro para toast
  const router = useRouter();
  const searchParams = useSearchParams();
  const userChanged = searchParams.get('userChanged');
  const created = searchParams.get('create');

  useEffect(() => {
    if (userChanged === '1') {
      toast.dismiss();
      toast.success(
        'Seu usuário foi alterado com sucesso. Faça login novamente.',
      );
      // remove o parametro da url
      const url = new URL(window.location.href);
      url.searchParams.delete('userChanged');
      router.replace(url.toString());
    }

    if (created === '1') {
      toast.dismiss();
      toast.success('Conta criada com sucesso. Faça login.');
      // remove o parametro da url
      const url = new URL(window.location.href);
      url.searchParams.delete('created');
      router.replace(url.toString());
    }
  }, [userChanged, created, router]);

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
          name='email'
          labelText='e-mail'
          placeholder='exemplo@dominio.com'
          disabled={isPending}
          defaultValue={state.email}
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

        <Button disabled={isPending} type='submit' className='mt-4'>
          <LogInIcon />
          Entrar
        </Button>

        <p className='text-sm/tight  '>
          <Link
            href='/user/new'
            className='underline hover:no-underline hover:text-blue-700 cursor-pointer'
          >
            Criar minha conta
          </Link>
        </p>

        {/* {!!state.error && <p className='text-red-600'>{state.error}</p>} */}
      </form>
    </div>
  );
}
