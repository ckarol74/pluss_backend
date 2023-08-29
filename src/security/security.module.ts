import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { PersonaService } from './services/persona.service';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { ParametricaModule } from 'src/parametrica/parametrica.module';
import { PlussModule } from 'src/pluss/pluss.module';

@Module({
  controllers: [AuthController],
  providers: [PersonaService, AuthService, JwtStrategy],
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRATION'),
          },
        };
      },
    }),
    TypeOrmModule.forFeature([Persona, Usuario, Rol]),
    // forwardRef(() => PlussModule),
    PlussModule,
    ParametricaModule,
  ],
  exports: [
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    AuthService,
    PersonaService,
  ],
})
export class SecurityModule {}
