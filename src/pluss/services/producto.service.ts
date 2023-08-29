import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from '../entities/producto.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/security/entities/usuario.entity';
import { CreateProductoDto } from '../dtos/producto.create.dto';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async create(
    productoDto: CreateProductoDto,
    usuario: Usuario,
  ): Promise<Producto> {
    const productoCreated = this.productoRepository.create({
      usuarioRegistro: usuario.usuario,
      ...productoDto,
    });
    return await this.productoRepository.save(productoCreated);
  }

  async createByComercio(
    productoDto: CreateProductoDto,
    usuario: Usuario,
  ): Promise<Producto> {
    const productoCreated = this.productoRepository.create({
      usuarioRegistro: usuario.usuario,
      ...productoDto,
      idComercio: usuario.persona.personalComercio.idComercio,
    });
    return await this.productoRepository.save(productoCreated);
  }

  async getById(id: number): Promise<Producto> {
    const producto: Producto = await this.productoRepository.findOneBy({ id });
    if (producto) return producto;
    throw new NotFoundException('No se ha encontrado el producto');
  }

  async getByComercio(idComercio: number) {
    const productos: Producto[] = await this.productoRepository.find({
      where: { idComercio: idComercio },
    });
    if (productos && productos.length > 0) return productos;
    throw new NotFoundException('El Comercio no tiene productos');
  }

  async softDelete(id: number, usuario: Usuario) {
    try {
      const producto = await this.productoRepository.preload({
        id,
        usuarioUltimaModificacion: usuario.usuario,
      });
      await this.productoRepository.save(producto);
      await this.productoRepository.softDelete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al eliminar el producto',
      );
    }
  }

  async setImagen(
    id: number,
    imagen: string,
    usuario: Usuario,
  ): Promise<Producto> {
    const producto: Producto = await this.productoRepository.preload({
      id,
      imagen,
      usuarioUltimaModificacion: usuario.usuario,
    });
    return await this.productoRepository.save(producto);
  }
}
