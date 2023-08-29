import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProductoService } from '../services/producto.service';
import { Auth, GetUser } from 'src/security/decorators';
import { ValidRoles } from 'src/security/interfaces/valid-roles';
import { ApiResponse } from '@nestjs/swagger';
import { CreateProductoDto } from '../dtos/producto.create.dto';
import { Usuario } from 'src/security/entities/usuario.entity';

@Controller('producto')
export class ProductoController {
  constructor(private readonly $producto: ProductoService) {}

  @Post()
  @Auth(ValidRoles.administrador)
  @ApiResponse({
    status: 200,
    description: 'Crear un producto para cualquier comercio',
  })
  async createProducto(
    @Body() productoDto: CreateProductoDto,
    @GetUser() user: Usuario,
  ) {
    return await this.$producto.create(productoDto, user);
  }

  @Post('comercio')
  @Auth(
    ValidRoles.administrador,
    ValidRoles.comercio,
    ValidRoles.operadorComercio,
  )
  @ApiResponse({
    status: 200,
    description: 'Crear un producto por comercio',
  })
  async createProductoByUser(
    @Body() productoDto: CreateProductoDto,
    @GetUser() user: Usuario,
  ) {
    return await this.$producto.createByComercio(productoDto, user);
  }

  @Get('findById/:id')
  @ApiResponse({
    status: 200,
    description: 'Buscar un producto por su Id',
  })
  async getProductById(@Param('id', ParseIntPipe) id: number) {
    return await this.$producto.getById(id);
  }

  @Get('findByIdComercio/:idComercio')
  @ApiResponse({
    status: 200,
    description: 'Buscar todos los productos por el ID comercio',
  })
  async getProductByIdComercio(
    @Param('idComercio', ParseIntPipe) idComercio: number,
  ) {
    return await this.$producto.getByComercio(idComercio);
  }

  @Delete(':id')
  @Auth(ValidRoles.comercio, ValidRoles.administrador)
  @ApiResponse({
    status: 200,
    description: 'Hace una eliminación segura del producto',
  })
  async softDeleteProducto(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: Usuario,
  ) {
    return await this.$producto.softDelete(id, user);
  }
}
