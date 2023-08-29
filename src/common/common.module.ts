import { Module } from '@nestjs/common';
import { FilesController } from './controllers/files.controller';
import { FilesService } from './services/files/files.service';
import { ConfigModule } from '@nestjs/config';
import { SecurityModule } from 'src/security/security.module';
import { PlussModule } from 'src/pluss/pluss.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule, SecurityModule, PlussModule],
})
export class CommonModule {}
