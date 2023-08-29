import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  constructor() {}

  getStaticProfileImage(profileName: string) {
    const path = join(__dirname, '../../../../static/commerce', profileName);
    if (!existsSync(path))
      throw new BadRequestException(`El perfil ${profileName} no existe`);
    return path;
  }
}
