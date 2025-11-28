// cursos/entities/curso.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProfesorEntity } from '../../profesores/entities/profesor.entity';
import { InscripcionEntity } from '../../inscripciones/entities/inscripcion.entity';

@Entity('cursos')
export class CursoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: 0 })
  creditos: number;

  @ManyToOne(() => ProfesorEntity, (prof) => prof.cursos, { eager: true })
  @JoinColumn({ name: 'profesores_id' })
  profesor: ProfesorEntity;

  @Column()
  profesor_id: number;

  @OneToMany(() => InscripcionEntity, (insc) => insc.curso)
  inscripciones?: InscripcionEntity[];
}
