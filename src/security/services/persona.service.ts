import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from '../dtos/create-persona.dto';
import { Persona } from '../entities/persona.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(persona: CreatePersonaDto, user: Usuario) {
    try {
      const personaSaved = this.personaRepository.create({
        usuarioRegistro: user.usuario,
        ...persona,
      });

      const personaCreated = await this.personaRepository.save(personaSaved);

      return personaCreated;
    } catch (error) {
      throw new InternalServerErrorException('Error interno');
    }
  }

  async update(id: number, personaUpdated: CreatePersonaDto, user: Usuario) {
    try {
      const personaExist = await this.personaRepository.preload({
        id,
        usuarioUltimaModificacion: user.usuario,
        ...personaUpdated,
      });
      if (!personaExist)
        throw new NotFoundException(`La persona con el id: ${id} no existe`);

      return await this.personaRepository.save(personaExist);
    } catch (error) {
      throw new InternalServerErrorException('Error interno');
    }
  }

  async getPersonaById(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOneBy({ id });
    if (persona) return persona;
    throw new NotFoundException(
      `La persona con el id ${id} no se ha encontrado`,
    );
  }
}
