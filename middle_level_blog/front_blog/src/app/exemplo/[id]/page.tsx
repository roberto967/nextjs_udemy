'use server';

import { revalidateExampleAction } from '../../actions/revalidate.example';

export default async function ExemploPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Exemplo {id}</h1>

      <form action={revalidateExampleAction} className='py-16'>
        <input type='hidden' name='path' defaultValue={`/exemplo/${id}`} />
        <button
          type='submit'
          className='bg-amber-300  p-2 rounded hover:bg-amber-400 transition cursor-pointer'
        >
          Revalidate!!!
        </button>
      </form>
    </div>
  );
}
