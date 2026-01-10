import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Post } from './entities/post.entity';
import { User } from 'src/user/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { createSlugFromText } from '@utils/create-slug-from-text';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findOneOrFail(fields: FindOptionsWhere<Post>): Promise<Post> {
    const post: Post = await this.findOne(fields);

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  async findOne(fields: FindOptionsWhere<Post>): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: fields,
      relations: ['author'],
    });

    return post!;
  }

  async findAll(fields: FindOptionsWhere<Post>) {
    const posts = await this.postRepository.find({
      where: fields,
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return posts;
  }

  async findOneOwnedOrFail(fields: FindOptionsWhere<Post>, author: User) {
    const post = await this.findOneOwned(fields, author);

    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }

    return post;
  }

  // 6. Alterado de Partial<Post> para FindOptionsWhere<Post>
  async findOneOwned(fields: FindOptionsWhere<Post>, author: User) {
    const post = await this.postRepository.findOne({
      where: {
        ...fields,
        author: { id: author.id },
      },
      relations: ['author'],
    });

    return post;
  }

  async findOneAdmin(fields: FindOptionsWhere<Post>) {
    const post = await this.postRepository.findOne({
      where: fields,
      relations: ['author'],
    });

    return post;
  }

  async findOneAdminOrFail(fields: FindOptionsWhere<Post>) {
    const post = await this.findOneAdmin(fields);
    if (!post) {
      throw new NotFoundException('Post não encontrado');
    }
    return post;
  }

  async findAllOwned(author: User) {
    const posts = await this.postRepository.find({
      where: {
        author: { id: author.id },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });

    return posts;
  }

  async create(dto: CreatePostDto, author: User) {
    const post: Post = this.postRepository.create({
      slug: createSlugFromText(dto.title),
      author,
      content: dto.content,
      excerpt: dto.excerpt,
      coverImageUrl: dto.coverImageUrl,
      title: dto.title,
    });

    const created = await this.postRepository
      .save(post)
      .catch((err: unknown) => {
        if (err instanceof Error) {
          this.logger.error('Erro ao criar post', err.stack);
        }

        throw new BadRequestException('Erro ao criar o post');
      });

    return created;
  }

  async update(
    fields: FindOptionsWhere<Post>,
    dto: UpdatePostDto,
    author: User,
  ) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Dados não enviados');
    }

    const post = await this.findOneOwnedOrFail(fields, author);

    post.title = dto.title ?? post.title;
    post.content = dto.content ?? post.content;
    post.excerpt = dto.excerpt ?? post.excerpt;
    post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
    post.published = dto.published ?? post.published;

    return this.postRepository.save(post);
  }

  async updateAdmin(
    fields: FindOptionsWhere<Post>,
    dto: UpdatePostDto,
    author: User,
  ) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Dados não enviados');
    }
    const post = await this.findOneOrFail(fields);

    post.title = dto.title ?? post.title;
    post.content = dto.content ?? post.content;
    post.excerpt = dto.excerpt ?? post.excerpt;
    post.coverImageUrl = dto.coverImageUrl ?? post.coverImageUrl;
    post.published = dto.published ?? post.published;
    post.author = author ?? post.author;
    return this.postRepository.save(post);
  }

  async removeAdmin(fields: FindOptionsWhere<Post>) {
    const post = await this.findOneOrFail(fields);
    await this.postRepository.delete({ id: post.id });
    return post;
  }

  async remove(fields: FindOptionsWhere<Post>, author: User) {
    const post = await this.findOneOrFail(fields);

    await this.postRepository.delete({
      id: post.id,
      author: { id: author.id },
    });
    return post;
  }
}
