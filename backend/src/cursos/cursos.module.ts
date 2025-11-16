import { Module } from '@nestjs/common';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';
import { CursoEntity } from './entities/curso.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CursosService],
  controllers: [CursosController],
  imports: [TypeOrmModule.forFeature([CursoEntity])],
  exports: [TypeOrmModule, CursosService],
})
export class CursosModule {}
