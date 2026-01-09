import PostCoverImage from '../PostCoverImage';
import { PostModel } from '@/models/post/post.model';
import PostSumary from '../PostSumary';
import { findAllPublicPostsCached } from '@/lib/post/queries/public';
import ErrorMessage from '../ErrorMessage';

/* 
  const mockedPost: PostModel = {
  id: '1',
  title: 'Welcome to My Simple Blog',
  slug: 'welcome-to-my-simple-blog',
  coverImageUrl: '/images/bryen_0.png',

  updatedAt: '2024-06-01T10:00:00',
  createdAt: '2024-04-20T10:00:00',
  excerpt:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis augue at lorem venenatis facilisis.',
  published: true,
  author: 'Admin',
  content:
    ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis augue at lorem venenatis facilisis.Aenean nec pellentesque mi, ut rhoncus erat. Cras ante tellus, ultricies non nisl consequat, feugiat porta sapien. Duis maximus, eros in convallis ullamcorper, quam neque vulputate lorem, quis pretium libero justo ac libero. Donec quam justo, efficitur sit amet gravida ut, auctor sed lacus. Nam in lorem sed velit sodales ullamcorper in non erat. Praesent euismod, nunc vel congue cursus, massa erat faucibus libero, in efficitur ligula erat et velit. Curabitur euismod, nisl vel tincidunt elementum, nunc urna facilisis massa, a fringilla libero nulla nec nisi. Sed euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam nisl nunc eu nisl. Nulla facilisi. Donec euismod, nisl vel tincidunt elementum, nunc urna facilisis massa, a fringilla libero nulla nec nisi.',
};

const mockedPostLink = `/post/${mockedPost.slug}`; 
*/

export default async function PostFeatured() {
  const posts: PostModel[] = await findAllPublicPostsCached();

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
