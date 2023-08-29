import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Usuario } from '../entities/usuario.entity';
import { Persona } from '../entities/persona.entity';
import { Rol } from '../entities/rol.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload';
import { LoginUsuarioDto } from '../dtos/login-usuario.dto';
import { CreatePersonaDto } from '../dtos/create-persona.dto';
import { ClienteService } from 'src/pluss/services/cliente.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,

    private readonly jwtService: JwtService,
    private readonly $cliente: ClienteService,
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async registerClient(
    personaDto: CreatePersonaDto,
  ): Promise<{ user: Usuario; token: string }> {
    try {
      const personaCreated = this.personaRepository.create({
        usuarioRegistro: 'auto_register',
        ...personaDto,
      });
      const personaSaved: Persona = await this.personaRepository.save(
        personaCreated,
      );
      await this.$cliente.createAlone({ idPersona: personaSaved.id });
      const rolesExist: Rol[] = [];
      const rolExist = await this.rolRepository.findOneBy({ id: 1 });
      rolesExist.push(rolExist);
      const usuarioCreated = this.usuarioRepository.create({
        usuario: personaSaved.numeroDocumento,
        contrasena: bcrypt.hashSync(personaSaved.numeroDocumento, 10),
        persona: personaSaved,
        roles: rolesExist,
        usuarioRegistro: 'auto_register',
      });
      const usuarioSaved: Usuario = await this.usuarioRepository.save(
        usuarioCreated,
      );
      delete usuarioSaved.contrasena;

      return {
        user: usuarioSaved,
        token: this.getJwtToken({ id: usuarioCreated.id }),
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error interno');
    }
  }

  async login(
    loginUsuarioDto: LoginUsuarioDto,
  ): Promise<{ user: Usuario; token: string }> {
    const { usuario, contrasena } = loginUsuarioDto;
    const userLogged: Usuario = await this.usuarioRepository.findOne({
      where: { usuario: usuario },
      select: { usuario: true, contrasena: true, id: true },
    });
    if (!userLogged)
      throw new UnauthorizedException('Credenciales no válidas (Usuario)');
    if (!bcrypt.compareSync(contrasena, userLogged.contrasena))
      throw new UnauthorizedException('Credenciales no válidas (Contraseña)');
    delete userLogged.contrasena;
    return {
      user: userLogged,
      token: this.getJwtToken({ id: userLogged.id }),
    };
  }
}
