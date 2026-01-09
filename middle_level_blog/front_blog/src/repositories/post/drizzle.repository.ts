import { PostModel } from '@/models/post/post.model';
import { PostRepository } from './post.repository';
import { drizzleDB } from '@/db/drizzle';
import { logColor } from '@/utils/log-color';
import { simulateDelay } from '@/utils/async-delay';
// import { simulateDelayMS } from '@/lib/constants';
import { postsTable } from '@/db/drizzle/schemas';
import { eq } from 'drizzle-orm';

const simulateDelayMS = Number(process.env.SIMULATED_DELAY_MS);

export class DrizzlePostRepository implements PostRepository {
  async findAll(): Promise<PostModel[]> {
    logColor('Simulate delay: ', String(process.env.SIMULATED_DELAY_MS));
    await simulateDelay(simulateDelayMS, true);

    logColor('findAll');

    const posts: PostModel[] = await drizzleDB.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
    });

    return posts;
  }

  async findById(id: string): Promise<PostModel> {
    await simulateDelay(simulateDelayMS, true);

    logColor('findById');

    const post: PostModel | undefined = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }

  async findAllPublic(): Promise<PostModel[]> {
    await simulateDelay(simulateDelayMS, true);

    logColor('findAllPublic');

    const posts: PostModel[] = await drizzleDB.query.posts.findMany({
      orderBy: (posts, { desc }) => desc(posts.createdAt),
      where: (posts, { eq }) => eq(posts.published, true),
    });

    return posts;
  }

  async findBySlugPublic(slug: string): Promise<PostModel> {
    await simulateDelay(simulateDelayMS, true);

    logColor('findBySlugPublic');

    const post: PostModel | undefined = await drizzleDB.query.posts.findFirst({
      where: (posts, { and, eq }) =>
        and(eq(posts.slug, slug), eq(posts.published, true)),
    });

    if (!post) {
      throw new Error('Post not found or not published');
    }

    return post;
  }

  // mutations
  async create(post: PostModel): Promise<PostModel> {
    const postExists = await drizzleDB.query.posts.findFirst({
      where: (posts, { or, eq }) =>
        or(eq(posts.id, post.id), eq(posts.slug, post.slug)),
      columns: { id: true },
    });

    if (!!postExists) {
      throw new Error('Post com ID ou Slug já existe na base de dados');
    }

    await drizzleDB.insert(postsTable).values(post);
    return post;
  }

  async update(
    id: string,
    newPostData: Omit<PostModel, 'id' | 'slug' | 'createdAt' | 'updatedAt'>,
  ): Promise<PostModel> {
    const oldPost = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!oldPost) {
      throw new Error('Post não existe');
    }

    const updatedAt = new Date().toISOString();
    const postData = {
      author: newPostData.author,
      content: newPostData.content,
      coverImageUrl: newPostData.coverImageUrl,
      excerpt: newPostData.excerpt,
      published: newPostData.published,
      title: newPostData.title,
      updatedAt,
    };
    await drizzleDB
      .update(postsTable)
      .set(postData)
      .where(eq(postsTable.id, id));

    return {
      ...oldPost,
      ...postData,
    };
  }

  async delete(id: string): Promise<PostModel> {
    const post = await drizzleDB.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, id),
    });

    if (!post) {
      throw new Error('Post não existe');
    }

    await drizzleDB.delete(postsTable).where(eq(postsTable.id, id));

    return post;
  }
}

// (async () => {
//   const repo = new DrizzlePostRepository();
//   // const posts = await repo.findAllPublic();

//   // posts.forEach(post => console.log(post.slug, post.published));

//   //find by id test
//   // const post = await repo.findById('99f8add4-7684-4c16-a316-616271db199e');
//   // console.log(post);

//   //find all test
//   // const allPosts = await repo.findAll();
//   // console.log('All posts count:', allPosts.length);

//   //find by slug public test
// })();
