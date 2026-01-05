import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class UserResponseDto {
  @ApiProperty({
    description: 'ID do usuário',
    example: 'a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6',
  })
  readonly id: string;
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João da Silva',
  })
  readonly name: string;
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'user@example.com',
  })
  readonly email: string;
  @ApiProperty({
    description: 'Data de criação do usuário',
    example: '2024-01-01T12:00:00.000Z',
  })
  readonly createdAt: Date;
  @ApiProperty({
    description: 'Data de atualização do usuário',
    example: '2024-01-02T12:00:00.000Z',
  })
  readonly updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
