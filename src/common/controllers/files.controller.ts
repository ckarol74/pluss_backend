import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../helpers/file_filter';
import { diskStorage } from 'multer';
import { fileNamer } from '../helpers/file_namer';
import { FilesService } from '../services/files/files.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ComercioService } from 'src/pluss/services/comercio.service';
import { Auth, GetUser } from 'src/security/decorators';
import { ValidRoles } from 'src/security/interfaces/valid-roles';
import { Usuario } from 'src/security/entities/usuario.entity';
import { CreateImageComercioDto } from '../dto/image-comercio.create.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly $files: FilesService,
    private readonly $config: ConfigService,
    private readonly $comercio: ComercioService,
  ) {}

  @Get('imagen/:imageName')
  findOneFile(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.$files.getStaticProfileImage(imageName);
    res.sendFile(path);
  }

  @Post('comercio')
  @Auth(ValidRoles.administrador, ValidRoles.comercio)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/commerce',
        filename: fileNamer,
      }),
    }),
  )
  async uploadComercioImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() comercio: CreateImageComercioDto,
    @GetUser() user: Usuario,
  ) {
    if (!file) throw new BadRequestException('No ha subido ninguna imagen');
    const secureUrl = `${this.$config.get('HOST_API')}/files/imagen/${
      file.filename
    }`;
    if (comercio.perfil)
      await this.$comercio.setPerfil(comercio.idComercio, secureUrl, user);
    else this.$comercio.setPortada(comercio.idComercio, secureUrl, user);
    return { secureUrl };
  }

  @Post('producto')
  @Auth(ValidRoles.administrador, ValidRoles.comercio)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/product',
        filename: fileNamer,
      }),
    }),
  )
  async uploadProductoImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() producto: any,
    @GetUser() user: Usuario,
  ) {
    if (!file) throw new BadRequestException('No ha subido ninguna imagen');
    const secureUrl = `${this.$config.get('HOST_API')}/files/imagen/${
      file.filename
    }`;
    if (producto) return { secureUrl };
  }
}
