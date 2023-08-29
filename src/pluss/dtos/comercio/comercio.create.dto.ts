import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateComercioDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  @MaxLength(100, { message: 'El nombre no puede tener más de 100 caracteres' })
  nombre: string;

  @IsNumber()
  idRubro: number;

  @IsNumber()
  porcentaje: number;

  @IsString()
  @MaxLength(50, { message: 'El Nit no puede tener mas de 50 caracteres' })
  nit: string;

  @IsString()
  @MaxLength(25, {
    message: 'EL número de celular no puede tener más de 25 caracteres',
  })
  celular: string;

  @IsString()
  @MaxLength(500, {
    message: 'La descripción no puede tener mas de 500 caracteres',
  })
  descripcion: string;
}
