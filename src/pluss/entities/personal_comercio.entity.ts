import { Auditoria } from 'src/common/entities/auditoria.entity';
import { Persona } from 'src/security/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comercio } from './comercio.entity';

@Entity({ name: 'personal_comercio', schema: 'pluss' })
export class PersonalComercio extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'id_persona', type: 'bigint' })
  idPersona: number;

  @Column({ name: 'id_comercio', type: 'bigint' })
  idComercio: number;

  @OneToOne(() => Persona, (persona) => persona.personalComercio)
  @JoinColumn({ name: 'id_persona', referencedColumnName: 'id' })
  persona: Persona;

  @OneToOne(() => Comercio, (comercio) => comercio.personalComercio, {
    eager: true,
  })
  @JoinColumn({ name: 'id_comercio', referencedColumnName: 'id' })
  comercio: Comercio;
}
