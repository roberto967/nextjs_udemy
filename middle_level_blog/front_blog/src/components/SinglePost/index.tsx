import { findPublicPostBySlugFromApiCached } from '@/lib/post/queries/public';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import PostDate from '../PostDate';
import SafeMarkdown from '../SafeMarkdown';
import { PostModelFromApi } from '@/models/post/post.schema';

type SinglePostProps = {
  slug: string;
};

export default async function SinglePost({ slug }: SinglePostProps) {
  const postResponse = await findPublicPostBySlugFromApiCached(slug);

  if (!postResponse.success) {
    console.log(postResponse.errors);
    return <p>Post não encontrado.</p>;
  }

  const post: PostModelFromApi = postResponse.data;

  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
          //TODO: REMOVER necessidade do unoptimized
          unoptimized
        />

        <PostHeading link={`/post/${post.slug}`}>{post.title}</PostHeading>

        {post.author && (
          <p className='text-sm text-slate-500 select-none'>
            Por {post.author.name}
          </p>
        )}
      </header>

      <p className='text-xl mb-4 text-slate-600'>{post.excerpt}</p>

      <SafeMarkdown markdown={post.content} />
    </article>
  );
}
