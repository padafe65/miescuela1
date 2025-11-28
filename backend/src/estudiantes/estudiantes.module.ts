import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { EstudianteEntity } from './entities/estudiante.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
<<<<<<< HEAD
import { UsuarioEntity } from 'src/usuarios/entities/usuario.entity';
=======
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

@Module({
  providers: [EstudiantesService],
  controllers: [EstudiantesController],
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([EstudianteEntity, UsuarioEntity])],
=======
  imports: [TypeOrmModule.forFeature([EstudianteEntity])],
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  exports: [TypeOrmModule, EstudiantesService],
})
export class EstudiantesModule {}
