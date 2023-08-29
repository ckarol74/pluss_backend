import { IsNumber, IsOptional } from 'class-validator';

export class PersonalComercioAssignDto {
  @IsNumber()
  idPersona: number;

  @IsNumber()
  idComercio: number;

  @IsNumber()
  @IsOptional()
  idCargo?: number;
}
