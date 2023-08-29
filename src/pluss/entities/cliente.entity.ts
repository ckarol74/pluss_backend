import { Auditoria } from 'src/common/entities/auditoria.entity';
import { ColumnNumericTransformer } from 'src/common/utils/handle.transform_data';
import { Persona } from 'src/security/entities/persona.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaccion } from './transaccion.entity';

@Entity({ name: 'cliente', schema: 'pluss' })
export class Cliente extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  codigo: string;

  @Column({
    transformer: new ColumnNumericTransformer(),
    nullable: false,
    type: 'numeric',
  })
  puntos: number;

  @Column({ name: 'id_persona', type: 'bigint' })
  idPersona: number;

  @OneToOne(() => Persona, (persona) => persona.cliente)
  @JoinColumn({ name: 'id_persona', referencedColumnName: 'id' })
  persona: Persona;

  @OneToMany(() => Transaccion, (transacciones) => transacciones.cliente)
  transacciones: Transaccion[];
}
