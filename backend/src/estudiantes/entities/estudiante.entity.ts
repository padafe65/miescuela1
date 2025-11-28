// estudiantes/entities/estudiante.entity.ts

import { Entity, PrimaryColumn, OneToOne, JoinColumn, Column } from 'typeorm';
import { UsuarioEntity } from '../../usuarios/entities/usuario.entity';
import { InscripcionEntity } from '../../inscripciones/entities/inscripcion.entity';
import { OneToMany } from 'typeorm';

@Entity('estudiantes')
export class EstudianteEntity {
  @PrimaryColumn()
  usuarios_id: number; // PK y FK

  @OneToOne(() => UsuarioEntity, (user) => user.estudiante, { eager: true })
  @JoinColumn({ name: 'usuarios_id' })
  usuario: UsuarioEntity;

  @Column()
  fecha_ingreso: Date;

  @OneToMany(() => InscripcionEntity, (ins) => ins.estudiante)
  inscripciones?: InscripcionEntity[];
}
