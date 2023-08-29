import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TransaccionService } from '../services/transaccion.service';
import { Auth, GetUser } from 'src/security/decorators';
import { ValidRoles } from 'src/security/interfaces/valid-roles';
import { ApiResponse } from '@nestjs/swagger';
import { Usuario } from 'src/security/entities/usuario.entity';
import { CreateTransaccionDto } from '../dtos/transaccion.create.dto';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

@Controller('transaccion')
export class TransaccionController {
  constructor(private readonly $transaccion: TransaccionService) {}

  @Get('/cliente')
  @Auth(ValidRoles.cliente)
  @ApiResponse({
    status: 200,
    description: 'Obtener todas las transacciones por cliente',
  })
  async getTransaccionesByCliente(@GetUser() user: Usuario) {
    return await this.$transaccion.getTransaccionesByIdCliente(
      user.persona.cliente.id,
    );
  }

  @Get('/comercio')
  @Auth(ValidRoles.comercio)
  @ApiResponse({
    status: 200,
    description: 'Obtener todas las transacciones por comercio',
  })
  async getTransaccionesByComercio(@GetUser() user: Usuario) {
    return await this.$transaccion.getTransaccionesByIdComercio(
      user.persona.personalComercio.comercio.id,
    );
  }

  @Get(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Obtener una transacción por su ID',
  })
  async getTransaccionesById(@Param('id', ParseIntPipe) id: number) {
    return await this.$transaccion.findTransaccionById(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Registra un nuevo comercio',
  })
  @Auth(ValidRoles.administrador)
  async createComercio(
    @Body() transaccionDto: CreateTransaccionDto,
    @GetUser() user: Usuario,
  ) {
    return await this.$transaccion.create(transaccionDto, user);
  }

  // @Get('bandeja')
  // @Auth(ValidRoles.comercio, ValidRoles.operadorComercio)
  // @ApiResponse({
  //   status: 200,
  //   description: 'Bandeja con paginación de las transacciones limit=10&page=1',
  // })
  // public async bandeja(
  //   @Param('stateId', ParseIntPipe) stateId: number,
  //   @Paginate() query: PaginateQuery,
  //   @GetUser() user: Usuario,
  // ): Promise<Paginated<any>> {
  //   // return await this.$trays.getTrayHl(stateId, query, user);
  //   return (await []) as Paginated;
  // }
}
