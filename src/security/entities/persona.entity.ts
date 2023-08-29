import { Auditoria } from 'src/common/entities/auditoria.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Departamento } from 'src/parametrica/entities/departamento';
import { Cliente } from 'src/pluss/entities/cliente.entity';
import { PersonalComercio } from 'src/pluss/entities/personal_comercio.entity';

@Entity({ name: 'persona', schema: 'seguridad' })
export class Persona extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  nombres: string;

  @Column({
    name: 'primer_apellido',
    type: 'text',
    nullable: true,
  })
  primerApellido?: string;

  @Column({
    name: 'segundo_apellido',
    type: 'text',
    nullable: true,
  })
  segundoApellido: string;

  @Column({
    name: 'nro_documento',
    type: 'text',
  })
  numeroDocumento: string;

  @Column({
    name: 'id_departamento',
    type: 'bigint',
  })
  idDepartamento: number;

  @Column('text')
  genero?: string;

  @Column({
    name: 'fecha_nacimiento',
    type: 'date',
  })
  fechaNacimiento: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  celular?: string;

  @Column({
    type: 'text',
    name: 'correo_electronico',
    nullable: false,
  })
  correoElectronico: string;

  @OneToMany(() => Usuario, (usuario) => usuario.persona)
  usuarios: Usuario[];

  @OneToOne(() => Cliente, (cliente) => cliente.persona, { eager: true })
  cliente: Cliente;

  @OneToOne(
    () => PersonalComercio,
    (personalComercio) => personalComercio.persona,
    { eager: true },
  )
  personalComercio: PersonalComercio;

  @ManyToOne(
    () => Departamento,
    (lugarEmisionDocumento) => lugarEmisionDocumento.personas,
    { eager: true },
  )
  @JoinColumn({
    name: 'id_departamento',
    referencedColumnName: 'id',
  })
  lugarEmisionDocumento: Departamento;
}
