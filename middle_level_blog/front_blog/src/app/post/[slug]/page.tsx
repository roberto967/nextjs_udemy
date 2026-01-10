import SpinLoader from '@/components/SpinLoader';
import SinglePost from '@/components/SinglePost';
import { findPublicPostBySlugFromApiCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import { Suspense } from 'react';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postResponse = await findPublicPostBySlugFromApiCached(slug);

  if (!postResponse.success) {
    console.log(postResponse.errors);
    return {
      title: 'Post não encontrado',
      description: 'O post que você está procurando não foi encontrado.',
    };
  }

  const post = postResponse.data;

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPageProps) {
  const { slug } = await params;

  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <SinglePost slug={slug} />
    </Suspense>
  );
}
