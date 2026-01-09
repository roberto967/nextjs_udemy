import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { makePublicPostFromDb } from '@/dto/post/post.dto';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { PostModel } from '@/models/post/post.model';
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
  const post: PostModel | null = await findPostByIdAdmin(id).catch();

  if (!post) {
    notFound();
  }

  const publicPost = makePublicPostFromDb(post);

  return (
    <>
      <h1>EDITAR post</h1>
      <ManagePostForm mode='update' publicPost={publicPost} />
    </>
  );
}
