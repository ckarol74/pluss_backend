import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateImageComercioDto {
  @IsNumber()
  @IsOptional()
  idComercio?: number;

  @IsBoolean({ message: 'El perfil debe ser booleano' })
  perfil: boolean;
}
