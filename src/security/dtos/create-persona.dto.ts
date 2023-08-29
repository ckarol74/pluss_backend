import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePersonaDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MinLength(1, {
    message: 'El nombre de la persona debe tener almenos 1 caracter',
  })
  nombres: string;

  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'El primer apellido debe tener almenos 3 caracteres',
  })
  primerApellido?: string;

  @IsString()
  @IsOptional()
  @MinLength(3, {
    message: 'El segundo apellido, debe tener alemonos 3 caracteres',
  })
  segundoApellido?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, {
    message: 'El número de celular debe tener almenos 8 dígitos',
  })
  celular?: string;

  @IsString()
  genero: string;

  @IsString()
  @MinLength(7, {
    message:
      'El número de documento de una persona debe tener almenos 7 carácteres',
  })
  numeroDocumento: string;

  @IsNumber()
  idDepartamento: number;

  @IsString()
  @IsEmail({}, { message: 'Debe ser un correo electrónico válido' })
  correoElectronico: string;
}
