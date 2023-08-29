import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento';
import { DepartamentoService } from './services/departamento.service';
import { ParametricaController } from './controllers/parametrica.controller';
import { Rubro } from './entities/rubro';
import { PlussModule } from 'src/pluss/pluss.module';
import { TipoRedSocial } from './entities/tipo_red_social';

@Module({
  controllers: [ParametricaController],
  providers: [DepartamentoService],
  imports: [
    TypeOrmModule.forFeature([Departamento, Rubro, TipoRedSocial]),
    PlussModule,
  ],
  exports: [TypeOrmModule, DepartamentoService],
})
export class ParametricaModule {}
