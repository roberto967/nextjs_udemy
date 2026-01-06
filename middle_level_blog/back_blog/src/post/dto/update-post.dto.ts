import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(
  PickType(CreatePostDto, ['title', 'coverImageUrl', 'excerpt', 'content']),
) {
  @ApiProperty({
    description: 'Indica se o post está publicado',
    example: true,
    required: false,
  })
  @IsOptional() // Vai depender da lógica que criarmos no service ou no Next.js
  @IsBoolean({ message: 'Campo de publicar post precisa ser boolean' })
  published?: boolean;
}
