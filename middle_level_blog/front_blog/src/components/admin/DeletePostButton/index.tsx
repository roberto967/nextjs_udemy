'use client';

import { deletePostAction } from '@/app/actions/post/delete-post.action';
import { Dialog } from '@/components/Dialog';
import { cn } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type DeletePostButtonProps = {
  id: string;
  title: string;
};

export default function DeletePostButton({ id, title }: DeletePostButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  function handleConfirm() {
    toast.dismiss();

    startTransition(async () => {
      const result = await deletePostAction(id);
      setShowDialog(false);

      if (result.errors.length > 0) {
        toast.error(result.errors);
        return;
      }

      toast.success('Post apagado com sucesso!');
    });
  }

  return (
    <>
      <button
        className={cn(
          'text-red-500 cursor-pointer transition',
          '[&_svg]:w-4 [&_svg]:h-4',
          'hover:scale-120 hover:text-red-700',
          'disabled:text-slate-600 disabled:cursor-not-allowed',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Apagar post?'
          content={
            <div className='text-center'>
              Tem certeza que deseja apagar o post:
              <br />
              <span className='font-bold underline'>{title}</span>
            </div>
          }
          onCancelAction={() => setShowDialog(false)}
          onConfirmAction={handleConfirm}
          disabled={isPending}
        />
      )}
    </>
  );
}
