// usuarios/entities/usuario.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { EstudianteEntity } from '../../estudiantes/entities/estudiante.entity';
import { ProfesorEntity } from '../../profesores/entities/profesor.entity';

@Entity('usuarios')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', {
    nullable: false,
    name: 'nombre_completo',
  })
  nombre_completo: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  correo: string;

  @Column()
  contrasena: string;

  @Column('text', {
    array: true,
    default: ['estudiante'],
  })
  rol: string[];

  // Relación 1:1 con Estudiante
  @OneToOne(() => EstudianteEntity, (est) => est.usuario)
  estudiante?: EstudianteEntity;

  // Relación 1:1 con Profesor
  @OneToOne(() => ProfesorEntity, (prof) => prof.usuario)
  profesor?: ProfesorEntity;
}
