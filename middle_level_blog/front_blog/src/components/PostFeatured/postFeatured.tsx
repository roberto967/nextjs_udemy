import PostCoverImage from '../PostCoverImage';
import PostSumary from '../PostSumary';
import { findAllPublicPostsByApiCached } from '@/lib/post/queries/public';
import ErrorMessage from '../ErrorMessage';
import { PostModelFromApi } from '@/models/post/post.schema';

export default async function PostFeatured() {
  const postsResponse = await findAllPublicPostsByApiCached();

  if (!postsResponse.success) {
    console.log(postsResponse.errors);
    return (
      <ErrorMessage
        contentTitle='Ei 😅'
        content='Não foi possível carregar os posts. Tente novamente mais tarde.'
      />
    );
  }

  const posts: PostModelFromApi[] = postsResponse.data;

  if (posts.length === 0) {
    return (
      <ErrorMessage
        contentTitle='Ops 😅'
        content='Ainda não criamos nenhum post.'
      />
    );
  }

  const post = posts[0];

  const postLink = `/post/${post.slug}`;

  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        linkProps={{ href: postLink }}
        imageProps={{
          src: post.coverImageUrl,
          alt: post.title,
          width: 1200,
          height: 720,
          className:
            'hover:scale-105 transition w-full h-full object-center object-cover',
          priority: true,
        }}
      />
      <PostSumary post={post} postHeadingLevel='h1' postLink={postLink} />
    </section>
  );
}
