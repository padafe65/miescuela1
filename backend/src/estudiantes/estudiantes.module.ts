import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { EstudianteEntity } from './entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';

@Module({
  providers: [EstudiantesService],
  controllers: [EstudiantesController],
  imports: [TypeOrmModule.forFeature([EstudianteEntity, UsuarioEntity])],
  exports: [TypeOrmModule, EstudiantesService],
})
export class EstudiantesModule {}
