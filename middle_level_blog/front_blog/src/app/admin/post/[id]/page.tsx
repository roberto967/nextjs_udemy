import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { findPostByIdFromApiAdmin } from '@/lib/post/queries/admin';
import { PublicPostForApiSchema } from '@/lib/post/schemas';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Editar post',
};

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: AdminPostIdPageProps) {
  const { id } = await params;
  const postRes = await findPostByIdFromApiAdmin(id);

  if (!postRes.success) {
    console.log(postRes.errors);
    notFound();
  }

  const post = postRes.data;
  const publicPost = PublicPostForApiSchema.parse(post);

  return (
    <>
      <h1>EDITAR post</h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </>
  );
}
