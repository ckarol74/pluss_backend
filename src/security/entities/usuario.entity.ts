import { Auditoria } from 'src/common/entities/auditoria.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Persona } from './persona.entity';
import { Rol } from './rol.entity';

@Entity({ name: 'usuario', schema: 'seguridad' })
export class Usuario extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  usuario: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  contrasena: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  activo: boolean;

  @Column({
    name: 'id_persona',
    type: 'bigint',
    nullable: false,
  })
  idPersona;

  @ManyToOne(() => Persona, (persona) => persona.usuarios, { eager: true })
  @JoinColumn({ name: 'id_persona', referencedColumnName: 'id' })
  persona: Persona;

  @ManyToMany(() => Rol, { eager: true })
  @JoinTable({
    name: 'usuario_rol',
    joinColumn: {
      name: 'id_usuario',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_rol',
      referencedColumnName: 'id',
    },
  })
  roles: Rol[];

  @BeforeInsert()
  onCreateUser() {
    this.activo = true;
  }
}
