import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRedSocialDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  enlace: string;

  @IsNumber()
  idComercio: number;

  @IsNumber()
  idTipoRedSocial: number;
}
