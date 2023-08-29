import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { RedSocialService } from '../services/red-social.service';
import { Auth } from 'src/security/decorators';
import { ValidRoles } from 'src/security/interfaces/valid-roles';
import { ApiResponse } from '@nestjs/swagger';
import { CreateRedSocialDto } from '../dtos/red_social.create.dto';

@Controller('red-social')
export class RedSocialController {
  constructor(private readonly $redSocial: RedSocialService) {}

  @Post()
  @Auth(ValidRoles.administrador, ValidRoles.comercio)
  @ApiResponse({
    status: 200,
    description: 'Crea o modifica la red social para un comercio',
  })
  async createRedSocial(@Body() redSocialDto: CreateRedSocialDto) {
    return await this.$redSocial.create(redSocialDto);
  }

  @Delete(':id')
  @Auth(ValidRoles.administrador, ValidRoles.comercio)
  @ApiResponse({
    status: 200,
    description: 'Elimina la red social de un comercio',
  })
  async deleteRedSocial(@Param('id', ParseIntPipe) id: number) {
    return await this.$redSocial.delete(id);
  }
}
