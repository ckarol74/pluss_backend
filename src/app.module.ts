import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityModule } from './security/security.module';
import { CommonModule } from './common/common.module';
import { PlussModule } from './pluss/pluss.module';
import { ParametricaModule } from './parametrica/parametrica.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: false,
    }),
    CommonModule,
    PlussModule,
    SecurityModule,
    ParametricaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
