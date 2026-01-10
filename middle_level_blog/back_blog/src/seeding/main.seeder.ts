import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Post } from 'src/post/entities/post.entity';
import * as rawPostsData from './data/posts.json';

interface PostJson {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const postRepository = dataSource.getRepository(Post);

    console.log('🌱 Seeding posts from JSON...');

    const data = rawPostsData as { posts: PostJson[] };

    const defaultAuthor = null;

    const posts: Post[] = [];

    for (const postJson of data.posts) {
      const post = postRepository.create({
        id: postJson.id,
        title: postJson.title,
        slug: postJson.slug,
        excerpt: postJson.excerpt,
        content: postJson.content,
        coverImageUrl: postJson.coverImageUrl,
        published: postJson.published,
        createdAt: new Date(postJson.createdAt),
        updatedAt: new Date(postJson.updatedAt),
        author: defaultAuthor,
      });

      posts.push(post);
    }

    await postRepository.upsert(posts, ['id']);

    console.log(`✅ ${posts.length} Posts inseridos com sucesso`);
  }
}
