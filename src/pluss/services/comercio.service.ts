import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comercio } from '../entities/comercio.entity';
import { Repository } from 'typeorm';
import { CreateComercioDto } from '../dtos/comercio/comercio.create.dto';
import { Usuario } from 'src/security/entities/usuario.entity';
import { IStatusCommerce } from '../models/status_commerce';
import { ClienteService } from './cliente.service';
import { TransaccionService } from './transaccion.service';

@Injectable()
export class ComercioService {
  constructor(
    @InjectRepository(Comercio)
    private readonly comercioRepository: Repository<Comercio>,
    private readonly $cliente: ClienteService,
    private readonly $transaccion: TransaccionService,
  ) {}

  async update(comercioDto: any) {
    return null;
  }

  async create(
    comercioDto: CreateComercioDto,
    usuario: Usuario,
  ): Promise<Comercio> {
    try {
      const comercioCreated = await this.comercioRepository.create({
        usuarioRegistro: usuario.usuario,
        ...comercioDto,
      });
      const comercioSaved = await this.comercioRepository.save(comercioCreated);
      return await this.getById(comercioSaved.id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al crear el comercio',
      );
    }
  }

  async getById(id: number): Promise<Comercio> {
    const comercio: Comercio = await this.comercioRepository.findOneBy({ id });
    if (comercio) return comercio;
    throw new NotFoundException('No se ha encontrado el comercio');
  }

  async getByRubro(idRubro: number) {
    const comercios: Comercio[] = await this.comercioRepository.find({
      where: { idRubro: idRubro },
    });
    if (comercios && comercios.length > 0) return comercios;
    throw new NotFoundException('El Rubro no tiene comercios');
  }

  async getAll() {
    return this.comercioRepository.find();
  }

  async softDelete(id: number, usuario: Usuario) {
    try {
      const comercio = await this.comercioRepository.preload({
        id,
        usuarioUltimaModificacion: usuario.usuario,
      });
      await this.comercioRepository.save(comercio);
      await this.comercioRepository.softDelete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al eliminar el comercio',
      );
    }
  }

  async setPerfil(
    id: number,
    perfil: string,
    usuario: Usuario,
  ): Promise<Comercio> {
    const comercio: Comercio = await this.comercioRepository.preload({
      id,
      perfil,
      usuarioUltimaModificacion: usuario.usuario,
    });
    return await this.comercioRepository.save(comercio);
  }

  async setPortada(
    id: number,
    portada: string,
    usuario: Usuario,
  ): Promise<Comercio> {
    const comercio: Comercio = await this.comercioRepository.preload({
      id,
      portada,
      usuarioUltimaModificacion: usuario.usuario,
    });
    return await this.comercioRepository.save(comercio);
  }

  async registerVisit(uuid: string) {
    const comercio = await this.getByUuId(uuid);
    comercio.visitas = comercio.visitas + 1;
    return await this.comercioRepository.save(comercio);
  }

  async getByUuId(uuid: string): Promise<Comercio> {
    const comercio: Comercio = await this.comercioRepository.findOneBy({
      uuid,
    });
    if (comercio) return comercio;
    throw new NotFoundException('No se ha encontrado el comercio');
  }

  async getStatus(id: number): Promise<IStatusCommerce> {
    let statusCommerce: IStatusCommerce = Object.assign({});
    statusCommerce.clientesByCommerce = (
      await this.$cliente.getByCommerce(id)
    ).length;
    statusCommerce.puntosByCommerce = await this.getPuntosByCommerce(id);
    statusCommerce.transaccionesByCommerce = (
      await this.$transaccion.getTransaccionesByIdComercio(id)
    ).length;
    statusCommerce.vistasByCommerce = (await this.getById(id)).visitas || 0;
    return statusCommerce;
  }

  async getPuntosByCommerce(id: number): Promise<any> {
    try {
      const puntos = await this.comercioRepository
        .createQueryBuilder('comercio')
        .select('SUM(transaccion.puntos)', 'total')
        .leftJoin('comercio.transacciones', 'transaccion')
        .where(`transaccion.idComercio = ${id}`)
        .getRawOne();
      return parseFloat(puntos.total) || 0;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error interno');
    }
  }
}
