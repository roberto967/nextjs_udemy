import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../entities/post.entity';

export class PostResponseDto {
  @ApiProperty({
    description: 'ID do post',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Título do post',
    example: 'Como utilizar o NestJS com TypeORM',
  })
  readonly title: string;

  @ApiProperty({
    description: 'Slug do post',
    example: 'como-utilizar-o-nestjs-com-typeorm',
  })
  readonly slug: string;

  @ApiProperty({
    description: 'Conteúdo do post',
    example:
      'Neste post, vamos explorar como utilizar o NestJS com TypeORM para construir APIs robustas...',
  })
  readonly content: string;

  @ApiProperty({
    description: 'Excerto do post',
    example: 'Neste post, vamos explorar como utilizar o NestJS com TypeORM...',
  })
  readonly excerpt: string;

  @ApiProperty({
    description: 'URL da imagem de capa do post',
    example: 'https://meublog.com/imagens/capa-post.jpg',
    nullable: true,
  })
  readonly coverImageUrl: string | null;

  @ApiProperty({
    description: 'Indica se o post está publicado',
    example: true,
  })
  readonly published: boolean;

  @ApiProperty({
    description: 'Data de criação do post',
    example: '2023-10-05T14:48:00.000Z',
  })
  readonly createdAt: Date;

  @ApiProperty({
    description: 'Data da última atualização do post',
    example: '2023-10-10T09:30:00.000Z',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'Informações do autor do post',
    example: {
      id: 'u1v2w3x4-y5z6-7890-abcd-ef1234567890',
      name: 'João Silva',
      email: 'joao.silva@example.com',
    },
  })
  readonly author: {
    id: string;
    name: string;
    email: string;
  };

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.slug = post.slug;
    this.content = post.content;
    this.excerpt = post.excerpt;
    this.coverImageUrl = post.coverImageUrl;
    this.published = post.published;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.author = {
      id: post.author.id,
      name: post.author.name,
      email: post.author.email,
    };
  }
}
