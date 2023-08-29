import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedSocial } from '../entities/red_social.entity';
import { Repository } from 'typeorm';
import { CreateRedSocialDto } from '../dtos/red_social.create.dto';
import { Usuario } from 'src/security/entities/usuario.entity';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocial)
    private readonly redSocialRepository: Repository<RedSocial>,
  ) {}

  async create(redSocialDto: CreateRedSocialDto): Promise<RedSocial> {
    if (redSocialDto.id) {
      return await this.redSocialRepository.save(redSocialDto);
    } else {
      const redSocial = await this.redSocialRepository.create({
        ...redSocialDto,
      });
      return await this.redSocialRepository.save(redSocial);
    }
  }

  async delete(id: number) {
    return this.redSocialRepository.delete(id);
  }
}
