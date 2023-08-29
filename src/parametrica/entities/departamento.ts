import { Persona } from 'src/security/entities/persona.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'departamento', schema: 'parametrica' })
export class Departamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  codigo: number;

  @Column()
  abrev: string;

  @OneToMany(() => Persona, (personas) => personas.lugarEmisionDocumento)
  personas: Persona[];
}
