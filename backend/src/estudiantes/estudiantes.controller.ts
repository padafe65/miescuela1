<<<<<<< HEAD
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { EstudiantesService } from './estudiantes.service';
import { JwtAuthGuard } from '../usuarios/guards/jwt-auth.guard';
import { RolesGuard } from '../usuarios/guards/roles.guard';
import { Roles } from '../usuarios/roles.decorator';
import { RolUsuario } from '../usuarios/entities/rol-usuario.enum';
import { CreateEstudianteDTO } from './dto/create-estudiante.dto';
import { UpdateEstudianteDTO } from './dto/update-estudiante.dto';

@Controller('estudiantes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get()
  @Roles(RolUsuario.PROFESOR)
  findAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.PROFESOR, RolUsuario.ESTUDIANTE)
  findOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(+id);
  }

  @Post('crear')
  @Roles(RolUsuario.ADMIN, RolUsuario.PROFESOR)
  create(@Body() dto: CreateEstudianteDTO) {
    return this.estudiantesService.create(dto);
  }

  @Patch(':id')
  @Roles(RolUsuario.ADMIN)
  update(@Param('id') id: string, @Body() dto: UpdateEstudianteDTO) {
    return this.estudiantesService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(RolUsuario.ADMIN)
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(+id);
  }
}
=======
import { Controller } from '@nestjs/common';

@Controller('estudiantes')
export class EstudiantesController {}
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
