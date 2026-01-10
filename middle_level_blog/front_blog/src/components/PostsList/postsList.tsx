import PostCoverImage from '../PostCoverImage';
import PostSumary from '../PostSumary';
import { findAllPublicPostsByApiCached } from '@/lib/post/queries/public';
import { PostModelFromApi } from '@/models/post/post.schema';

export default async function PostsList() {
  const postsResponse = await findAllPublicPostsByApiCached();

  if (!postsResponse.success) {
    console.log(postsResponse.errors);
    return null;
  }

  const posts: PostModelFromApi[] = postsResponse.data.slice(1);

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className='grid grid-cols-1 gap-8 pb-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {posts.map(post => {
        const postLink = `/post/${post.slug}`;

        return (
          <div key={post.id} className='flex flex-col gap-4 group '>
            <PostCoverImage
              linkProps={{ href: postLink }}
              imageProps={{
                src: post.coverImageUrl,
                alt: post.title,
                width: 1200,
                height: 720,
              }}
            />

            <PostSumary post={post} postLink={postLink} />
          </div>
        );
      })}
    </div>
  );
}
