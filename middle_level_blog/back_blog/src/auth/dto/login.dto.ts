import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'user@example.com',
    required: true,
  })
  @IsNotEmpty({ message: 'E-mail não pode estar vazio' })
  @IsEmail({}, { message: 'E-mail inválido' })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'strongPassword123',
    required: true,
  })
  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  @Expose()
  password: string;
}
