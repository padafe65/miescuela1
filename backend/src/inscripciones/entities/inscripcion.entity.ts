// inscripciones/entities/inscripcion.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EstudianteEntity } from '../../estudiantes/entities/estudiante.entity';
import { CursoEntity } from '../../cursos/entities/curso.entity';

@Entity('inscripciones')
export class InscripcionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha_inscripcion: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, nullable: true })
  nota: number;

  @ManyToOne(() => EstudianteEntity, (est) => est.inscripciones, {
    eager: true,
  })
  @JoinColumn({ name: 'estudiantes_id' })
  estudiante: EstudianteEntity;

  @Column()
  estudiantes_id: number;

  @ManyToOne(() => CursoEntity, (curso) => curso.inscripciones, { eager: true })
  @JoinColumn({ name: 'cursos_id' })
  curso: CursoEntity;

  @Column()
  cursos_id: number;
}
