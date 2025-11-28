import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { InscripcionEntity } from './entities/inscripcion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InscripcionesService],
  controllers: [InscripcionesController],
  imports: [TypeOrmModule.forFeature([InscripcionEntity])],
  exports: [TypeOrmModule, InscripcionesService],
})
export class InscripcionesModule {}
