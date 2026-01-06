import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título do post',
    example: 'Como utilizar o NestJS com TypeORM',
  })
  @IsNotEmpty({ message: 'Título não pode ficar vazio' })
  @IsString({ message: 'Título precisa ser uma string' })
  @Length(10, 150, { message: 'Título precisa ter entre 10 e 150 caracteres' })
  title: string;

  @ApiProperty({
    description: 'Excerto do post',
    example: 'Neste post, vamos explorar como utilizar o NestJS com TypeORM...',
  })
  @IsNotEmpty({ message: 'Excerto não pode ficar vazio' })
  @IsString({ message: 'Excerto precisa ser uma string' })
  @Length(10, 200, { message: 'Excerto precisa ter entre 10 e 200 caracteres' })
  excerpt: string;

  @ApiProperty({
    description: 'Conteúdo do post',
    example:
      'Neste post, vamos explorar como utilizar o NestJS com TypeORM para construir APIs robustas...',
  })
  @IsString({ message: 'Conteúdo precisa ser uma string' })
  @IsNotEmpty({ message: 'Conteúdo não pode ficar vazio' })
  content: string;

  @ApiProperty({
    description: 'URL da imagem de capa do post',
    example: 'https://meublog.com/imagens/capa-post.jpg',
    required: false,
  })
  @IsOptional() // Vai ser requerido no Next.js
  @IsUrl(
    { require_tld: false },
    { message: 'URL da imagem precisa ser uma URL válida' },
  ) // Top level domain proíbe localhost e IP
  coverImageUrl?: string;
}
