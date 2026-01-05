import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'Senha atual do usuário',
    example: 'currentPassword123',
    required: true,
  })
  @IsString({ message: 'Senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  currentPassword: string;

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'newStrongPassword123',
    required: true,
  })
  @IsString({ message: 'Nova senha precisa ser uma string' })
  @IsNotEmpty({ message: 'Nova senha não pode estar vazia' })
  @MinLength(6, {
    message: 'Nova senha deve ter um mínimo de 6 caracteres',
  })
  newPassword: string;
}
