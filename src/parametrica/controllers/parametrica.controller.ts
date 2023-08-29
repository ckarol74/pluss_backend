import { Controller, Get } from '@nestjs/common';
import { DepartamentoService } from '../services/departamento.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('parametrica')
export class ParametricaController {
  constructor(private readonly $departamento: DepartamentoService) {}

  @Get('departamento')
  @ApiResponse({ status: 200, description: 'Obtener todos los departamentos' })
  async getDepartamentos() {
    // await new Promise<void>((resolve) => {
    //   setTimeout(() => {
    //     // console.log('Este mensaje se imprimirá después de 3 segundos');
    //     resolve();
    //   }, 2000);
    // });
    return this.$departamento.findAll();
  }
}
