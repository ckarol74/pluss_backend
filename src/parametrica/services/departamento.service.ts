import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from '../entities/departamento';
import { Repository } from 'typeorm';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async findAll() {
    const departamentos: Departamento[] =
      await this.departamentoRepository.find();
    if (departamentos) return departamentos;
    throw new NotFoundException('No hay departamentos disponibles');
  }
}
