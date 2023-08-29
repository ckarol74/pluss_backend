import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsOptional()
  idComercio?: number;

  @IsString()
  @MaxLength(100, {
    message: 'El nombre del producto no puede tener más de 100 caracteres',
  })
  nombre: string;

  @IsString()
  @MaxLength(500, {
    message: 'La descripcion del producto no puede tener más de 500 caracteres',
  })
  descripcion: string;

  @IsNumber()
  precio: number;

  @IsBoolean()
  activo: boolean;
}
