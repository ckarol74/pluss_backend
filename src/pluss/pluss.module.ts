import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { SecurityModule } from 'src/security/security.module';
import { ClienteService } from './services/cliente.service';
import { ParametricaModule } from 'src/parametrica/parametrica.module';
import { Comercio } from './entities/comercio.entity';
import { PersonalComercio } from './entities/personal_comercio.entity';
import { RedSocial } from './entities/red_social.entity';
import { Producto } from './entities/producto.entity';
import { Transaccion } from './entities/transaccion.entity';
import { PersonalComercioService } from './services/personal-comercio.service';
import { ProductoService } from './services/producto.service';
import { RedSocialService } from './services/red-social.service';
import { TransaccionService } from './services/transaccion.service';
import { ComercioService } from './services/comercio.service';
import { ClienteController } from './controllers/cliente.controller';
import { ComercioController } from './controllers/comercio.controller';
import { PersonalComercioController } from './controllers/personal-comercio.controller';
import { ProductoController } from './controllers/producto.controller';
import { RedSocialController } from './controllers/red-social.controller';
import { TransaccionController } from './controllers/transaccion.controller';

@Module({
  controllers: [
    ClienteController,
    ComercioController,
    PersonalComercioController,
    ProductoController,
    RedSocialController,
    TransaccionController,
  ],
  providers: [
    ClienteService,
    ComercioService,
    PersonalComercioService,
    ProductoService,
    RedSocialService,
    TransaccionService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      Cliente,
      Comercio,
      PersonalComercio,
      RedSocial,
      Producto,
      Transaccion,
    ]),
    forwardRef(() => SecurityModule),
    forwardRef(() => ParametricaModule),
  ],
  exports: [TypeOrmModule, ClienteService, ComercioService, ProductoService],
})
export class PlussModule {}
