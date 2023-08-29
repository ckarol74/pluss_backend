import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTransaccionDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  @IsPositive({ message: 'Los puntos de la transacción deben ser mayores a 0' })
  puntos: number;

  @IsNumber(
    {},
    { message: 'El monto total de la transacción debe ser de tipo numérico' },
  )
  @IsPositive({ message: 'El costo de la transacción debe ser mayor a 0' })
  montoTotal: number;

  @IsString()
  nroDocumentoCliente: string;

  @IsBoolean()
  finalizado: boolean;

  @IsNumber()
  idCliente: number;

  @IsNumber()
  idComercio: number;

  // @IsArray({ message: 'La transacción debe tener almenos 1 detalle' })
  // @ValidateNested({ each: true })
  // @Type(() => CreateTransaccionProductoDto)
  // @IsOptional()
  // detalles?: CreateTransaccionProductoDto[];
}
