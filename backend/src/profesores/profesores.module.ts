import { Module } from '@nestjs/common';
import { ProfesoresService } from './profesores.service';
import { ProfesoresController } from './profesores.controller';
import { ProfesorEntity } from './entities/profesor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProfesoresService],
  controllers: [ProfesoresController],
  imports: [TypeOrmModule.forFeature([ProfesorEntity])],
  exports: [TypeOrmModule, ProfesoresService],
})
export class ProfesoresModule {}
