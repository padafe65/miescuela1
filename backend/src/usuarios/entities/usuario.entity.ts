<<<<<<< HEAD
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { EstudianteEntity } from '../../estudiantes/entities/estudiante.entity';
import { ProfesorEntity } from '../../profesores/entities/profesor.entity';
import { RolUsuario } from './rol-usuario.enum'; // ← IMPORTACIÓN AQUÍ
=======
// usuarios/entities/usuario.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { EstudianteEntity } from '../../estudiantes/entities/estudiante.entity';
import { ProfesorEntity } from '../../profesores/entities/profesor.entity';
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885

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
<<<<<<< HEAD
  @Column({
    type: 'boolean',
    default: true,
  })
  isactive: boolean;

  @Column({
    type: 'enum',
    enum: RolUsuario,
    array: true,
    default: [RolUsuario.ESTUDIANTE],
  })
  rol: RolUsuario[];

  @OneToOne(() => EstudianteEntity, (est) => est.usuario)
  estudiante?: EstudianteEntity;

=======

  @Column('text', {
    array: true,
    default: ['estudiante'],
  })
  rol: string[];

  // Relación 1:1 con Estudiante
  @OneToOne(() => EstudianteEntity, (est) => est.usuario)
  estudiante?: EstudianteEntity;

  // Relación 1:1 con Profesor
>>>>>>> 75618b7055a943d7e8c8c696684742aceeac3885
  @OneToOne(() => ProfesorEntity, (prof) => prof.usuario)
  profesor?: ProfesorEntity;
}
