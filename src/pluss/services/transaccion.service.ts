import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaccion } from '../entities/transaccion.entity';
import { Repository } from 'typeorm';
import { CreateTransaccionDto } from '../dtos/transaccion.create.dto';
import { Usuario } from 'src/security/entities/usuario.entity';
import {
  PaginateConfig,
  PaginateQuery,
  Paginated,
  paginate,
} from 'nestjs-paginate';

@Injectable()
export class TransaccionService {
  constructor(
    @InjectRepository(Transaccion)
    private readonly transaccionRepository: Repository<Transaccion>,
  ) {}

  async create(transaccion: CreateTransaccionDto, user: Usuario) {
    try {
      const transaccionCreated: Transaccion =
        await this.transaccionRepository.create({
          ...transaccion,
          usuarioRegistro: user.usuario,
        });
      const transaccionSaved = await this.transaccionRepository.save(
        transaccionCreated,
      );
      return transaccionSaved;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al guardar la transaccion, si sigue ocurriendo comuníquese con soporte',
      );
    }
  }

  async findTransaccionById(id: number): Promise<Transaccion> {
    const transaccion: Transaccion = await this.transaccionRepository.findOneBy(
      { id },
    );
    if (transaccion) return transaccion;
    throw new NotFoundException('No se ha encontrado la transacción');
  }

  async remove(id: number, user: Usuario) {
    const transaccionExist = await this.transaccionRepository.preload({
      id,
      usuarioUltimaModificacion: user.usuario,
    });
    if (transaccionExist) {
      const newTransaccion = await this.transaccionRepository.save(
        transaccionExist,
      );
      return await this.transaccionRepository.softDelete(newTransaccion.id);
    } else new NotFoundException('No existe la Transacción');
  }

  async getTransaccionesByIdCliente(idCliente: number) {
    return await this.transaccionRepository.findBy({ idCliente });
  }

  async getTransaccionesByIdComercio(
    idComercio: number,
  ): Promise<Array<Transaccion>> {
    return await this.transaccionRepository.findBy({ idComercio });
  }

  public async getTray(
    query: PaginateQuery,
    idComercio: number,
  ): Promise<Paginated<any>> {
    try {
      const config: PaginateConfig<Transaccion> = {
        loadEagerRelations: true,
        sortableColumns: ['id'],
        searchableColumns: ['id'],
        defaultSortBy: [['id', 'DESC']],
        defaultLimit: 10,
        relations: ['comercio'],
        where: {
          finalizado: true,
          idComercio: idComercio,
        },
      };
      // const { data, ...metaData } = await paginate(query, repo, config);
      // const formatedData = TrayHl.GenerateTrayHl(data);
      // return { data: formatedData, ...metaData };
      return await paginate(query, this.transaccionRepository, config);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error interno');
    }
  }
}
