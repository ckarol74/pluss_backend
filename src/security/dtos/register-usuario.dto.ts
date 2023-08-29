import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePersonaDto } from './create-persona.dto';
import { Type } from 'class-transformer';

export class RegisterUsuarioDto {
  @IsString()
  @MinLength(5, {
    message: 'El usuario debe tener almenos 5 caracteres',
  })
  usuario: string;

  @IsString()
  @MinLength(8, {
    message: 'La contraseña debe tener almenos 8 caracteres',
  })
  @MaxLength(50, {
    message: 'La contraseña debe tener menos de 50 caracteres',
  })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'La contraseña debe tener almenos una letra mayúscula, una minúscula y un número',
  })
  contrasena: string;

  @IsOptional()
  roles: number[];

  @ValidateNested({ each: true })
  @Type(() => CreatePersonaDto)
  persona?: CreatePersonaDto;
}
