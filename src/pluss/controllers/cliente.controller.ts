import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Auth } from 'src/security/decorators';
import { ClienteService } from '../services/cliente.service';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly $cliente: ClienteService) {}

  @Get()
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Obtener todos los Clientes',
  })
  async getAllClientes() {
    return this.$cliente.getAll();
  }

  @Get(':id')
  @Auth()
  @ApiResponse({
    status: 200,
    description: 'Obtener todos los Clientes',
  })
  async getClienteById(@Param('id', ParseIntPipe) id: number) {
    return await this.$cliente.getById(id);
  }

  @Get('comercio/:idComercio')
  @Auth()
  @ApiResponse({
    status: 200,
    description:
      'Obtener todos los Clientes que han tenido interacción con un comercio',
  })
  async getClienteByComercio(
    @Param('idComercio', ParseIntPipe) idComercio: number,
  ) {
    return await this.$cliente.getByCommerce(idComercio);
  }
}
