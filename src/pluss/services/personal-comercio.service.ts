import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalComercio } from '../entities/personal_comercio.entity';
import { Repository } from 'typeorm';
import { PersonalComercioAssignDto } from '../dtos/personal_comercio.assign.dto';
import { Usuario } from 'src/security/entities/usuario.entity';

@Injectable()
export class PersonalComercioService {
  constructor(
    @InjectRepository(PersonalComercio)
    private readonly personalComercioRepository: Repository<PersonalComercio>,
  ) {}

  async assignPersonalComercio(
    personalComercio: PersonalComercioAssignDto,
    user: Usuario,
  ) {
    const personalComercioCreated =
      await this.personalComercioRepository.create({
        idPersona: personalComercio.idPersona,
        idComercio: personalComercio.idComercio,
        usuarioRegistro: user.usuario,
      });
    return await this.personalComercioRepository.save(personalComercioCreated);
  }

  async assignOperadorComercio(
    personalComercio: PersonalComercioAssignDto,
    user: Usuario,
  ) {
    const personalComercioCreated =
      await this.personalComercioRepository.create({
        idPersona: personalComercio.idPersona,
        idComercio: personalComercio.idComercio,
        usuarioRegistro: user.usuario,
      });
    return await this.personalComercioRepository.save(personalComercioCreated);
  }

  async removePersonalComercio(id: number, user: Usuario) {
    const personalComerioExist = await this.personalComercioRepository.preload({
      id,
      usuarioUltimaModificacion: user.usuario,
    });
    if (personalComerioExist) {
      const newPersonalComercio = await this.personalComercioRepository.save(
        personalComerioExist,
      );
      return await this.personalComercioRepository.softDelete(
        newPersonalComercio.id,
      );
    } else
      new NotFoundException(
        'No existe el personal de un negocio con estos datos',
      );
  }
}
