import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ComercioService } from '../services/comercio.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/security/decorators';
import { ValidRoles } from 'src/security/interfaces/valid-roles';
import { Usuario } from 'src/security/entities/usuario.entity';
import { CreateComercioDto } from '../dtos/comercio/comercio.create.dto';

@ApiTags('Comercio')
@Controller('comercio')
export class ComercioController {
  constructor(private readonly $comercio: ComercioService) {}

  @Get()
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Obtener todos los Comercios',
  })
  async getAllComercios() {
    return this.$comercio.getAll();
  }

  @Get('status')
  @Auth(ValidRoles.comercio)
  @ApiResponse({
    status: 200,
    description: 'Obtener el estatus del Comercio',
  })
  async getStatusComercio(@GetUser() user: Usuario) {
    return await this.$comercio.getStatus(
      user.persona.personalComercio.idComercio,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Obtener un comercio por su Id',
  })
  async getComerciosById(@Param('id', ParseIntPipe) id: number) {
    return this.$comercio.getById(id);
  }

  @Get('rubro/:idRubro')
  @ApiResponse({
    status: 200,
    description: 'Obtener los comercios por su ID Rubro',
  })
  async getComerciosByRubro(@Param('idRubro', ParseIntPipe) idRubro: number) {
    return this.$comercio.getByRubro(idRubro);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Registra un nuevo comercio',
  })
  @Auth(ValidRoles.administrador)
  async createComercio(
    @Body() comercioDto: CreateComercioDto,
    @GetUser() user: Usuario,
  ) {
    return this.$comercio.create(comercioDto, user);
  }
}
