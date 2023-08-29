import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUsuarioDto {
  @ApiProperty({
    example: 'ketanolab.test',
    description: 'nombre de usuario',
  })
  @IsString()
  @MinLength(5, { message: 'El usuario debe tener almenos 5 carcateres' })
  usuario: string;

  @ApiProperty({
    example: 'Contrasena_1',
    description: 'referencia a contraseña',
  })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener almenos 8 caracteres' })
  contrasena: string;
}
