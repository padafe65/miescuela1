import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './entities/estudiante.entity';
import { UsuarioEntity } from '../usuarios/entities/usuario.entity';
import { CreateEstudianteDTO } from './dto/create-estudiante.dto';
import { UpdateEstudianteDTO } from './dto/update-estudiante.dto';

@Injectable()
export class EstudiantesService {
  constructor(
    @InjectRepository(EstudianteEntity)
    private estudianteRepo: Repository<EstudianteEntity>,

    @InjectRepository(UsuarioEntity)
    private usuarioRepo: Repository<UsuarioEntity>,
  ) {}

  findAll() {
    return this.estudianteRepo.find({
      relations: ['usuario'],
    });
  }

  async findOne(id: number) {
    const estudiante = await this.estudianteRepo.findOne({
      where: { usuarios_id: id },
      relations: ['usuario'],
    });

    if (!estudiante)
      throw new NotFoundException(`Estudiante ID ${id} no encontrado`);

    return estudiante;
  }

  async create(dto: CreateEstudianteDTO) {
    const usuario = await this.usuarioRepo.findOneBy({ id: dto.usuarios_id });
    if (!usuario)
      throw new NotFoundException(`Usuario ID ${dto.usuarios_id} no existe`);

    const est = this.estudianteRepo.create({
      usuarios_id: usuario.id,
      fecha_ingreso: dto.fecha_ingreso,
      usuario,
    });

    return this.estudianteRepo.save(est);
  }

  async update(id: number, dto: UpdateEstudianteDTO) {
    const estudiante = await this.estudianteRepo.preload({
      usuarios_id: id,
      ...dto,
    });

    if (!estudiante)
      throw new NotFoundException(`Estudiante ID ${id} no existe`);

    return this.estudianteRepo.save(estudiante);
  }

  async remove(id: number) {
    const estudiante = await this.findOne(id);
    return this.estudianteRepo.remove(estudiante);
  }
}
