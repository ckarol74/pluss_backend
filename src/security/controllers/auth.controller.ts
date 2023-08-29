import { Body, Controller, Get, Post, Req, Headers } from '@nestjs/common';
import { IncomingHttpHeaders } from 'http';
import { Auth, GetUser, RawHeaders } from '../decorators';
import { LoginUsuarioDto } from '../dtos/login-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { AuthService } from '../services/auth.service';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { CreatePersonaDto } from '../dtos/create-persona.dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private $usuario: AuthService) {}

  @Post('register/client')
  @ApiHeader({
    name: 'Authorization',
    description: 'Token de portador',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'crear un nuevo usuario' })
  registerUser(@Body() registerClientDto: CreatePersonaDto) {
    return this.$usuario.registerClient(registerClientDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'ingreso a sistema y obtencion de token',
    type: LoginUsuarioDto,
  })
  loginUser(@Body() loginUsuarioDto: LoginUsuarioDto) {
    return this.$usuario.login(loginUsuarioDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: Usuario) {
    return user;
  }

  @Get('private')
  @Auth()
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: Usuario,
    @GetUser('usuario') usuario: string,

    @RawHeaders() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      usuario,
      rawHeaders,
      headers,
    };
  }
}
