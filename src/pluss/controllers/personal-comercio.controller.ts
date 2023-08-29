import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PersonalComercioService } from '../services/personal-comercio.service';
import { Auth, GetUser } from 'src/security/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ValidRoles } from 'src/security/interfaces/valid-roles';
import { PersonalComercioAssignDto } from '../dtos/personal_comercio.assign.dto';
import { Usuario } from 'src/security/entities/usuario.entity';

@ApiTags('personal-comercio')
@Controller('personal-comercio')
export class PersonalComercioController {
  constructor(private readonly $personalComercio: PersonalComercioService) {}

  @Post()
  @Auth(ValidRoles.administrador)
  @ApiResponse({
    status: 200,
    description: 'Asignar personal a un comercio existente',
  })
  async assignComercioToPersona(
    @Body() personalComercioDto: PersonalComercioAssignDto,
    @GetUser() user: Usuario,
  ) {
    return await this.$personalComercio.assignPersonalComercio(
      personalComercioDto,
      user,
    );
  }

  @Post('/comercio')
  @Auth(ValidRoles.comercio)
  @ApiResponse({
    status: 200,
    description: 'Asignar un operador a un comercio existente',
  })
  async assignOperadorPersona(
    @Body() personalComercioDto: PersonalComercioAssignDto,
    @GetUser() user: Usuario,
  ) {
    return await this.$personalComercio.assignOperadorComercio(
      personalComercioDto,
      user,
    );
  }

  @Delete(':id')
  @Auth(ValidRoles.administrador)
  @ApiResponse({
    status: 200,
    description: 'Eliminar el personal de un comercio',
  })
  async deletePersonalComercio(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    return await this.$personalComercio.removePersonalComercio(id, user);
  }
}
