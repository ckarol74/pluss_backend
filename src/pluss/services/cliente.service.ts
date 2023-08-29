import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClienteDto } from 'src/pluss/dtos/cliente.create.dto';
import { Cliente } from 'src/pluss/entities/cliente.entity';
import { Persona } from 'src/security/entities/persona.entity';
import { Usuario } from 'src/security/entities/usuario.entity';
import { PersonaService } from 'src/security/services/persona.service';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    private readonly $persona: PersonaService,
  ) {}

  async createAlone(clienteDto: CreateClienteDto) {
    try {
      const persona: Persona = await this.$persona.getPersonaById(
        clienteDto.idPersona,
      );
      const clienteCreate = await this.clienteRepository.create({
        codigo: persona.numeroDocumento,
        puntos: 0,
        idPersona: persona.id,
        usuarioRegistro: 'auto-registrado',
      });
      return await this.clienteRepository.save(clienteCreate);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ha ocurrido un error interno');
    }
  }

  async getAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async getById(id: number): Promise<Cliente> {
    const cliente: Cliente = await this.clienteRepository.findOneBy({ id });
    if (cliente) return cliente;
    throw new NotFoundException('No se ha encontrado el cliente');
  }

  async softDelete(id: number, usuario: Usuario) {
    try {
      const cliente = await this.clienteRepository.preload({
        id,
        usuarioUltimaModificacion: usuario.usuario,
      });
      await this.clienteRepository.save(cliente);
      await this.clienteRepository.softDelete(id);
      return true;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Ha ocurrido un error al eliminar el cliente',
      );
    }
  }

  async getByCommerce(idCommerce: number): Promise<Array<Cliente>> {
    const clientes: Array<Cliente> = await this.clienteRepository
      .createQueryBuilder('cliente')
      .leftJoin('cliente.transacciones', 'transaccion')
      .leftJoin('transaccion.comercio', 'comercio')
      .where(`comercio.id = ${idCommerce}`)
      .getMany();
    return clientes || [];
  }
}
