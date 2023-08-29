import { IsNumber, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNumber()
  idPersona: number;
}
