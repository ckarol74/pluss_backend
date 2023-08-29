import { Auditoria } from 'src/common/entities/auditoria.entity';
import { ColumnNumericTransformer } from 'src/common/utils/handle.transform_data';
import { Rubro } from 'src/parametrica/entities/rubro';
import { Persona } from 'src/security/entities/persona.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonalComercio } from './personal_comercio.entity';
import { RedSocial } from './red_social.entity';
import { Producto } from './producto.entity';
import { Transaccion } from './transaccion.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'comercio', schema: 'pluss' })
export class Comercio extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  uuid?: string;

  @Column()
  nombre: string;

  @Column({
    transformer: new ColumnNumericTransformer(),
    nullable: false,
    type: 'numeric',
  })
  porcentaje: number;

  @Column()
  nit: string;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column()
  celular: string;

  @Column()
  descripcion: string;

  @Column({ name: 'id_rubro', type: 'bigint' })
  idRubro: number;

  @Column()
  perfil: string;

  @Column()
  portada: string;

  @Column({ type: 'bigint' })
  visitas: number;

  @ManyToOne(() => Rubro, (rubro) => rubro.comercios, { eager: true })
  @JoinColumn({ name: 'id_rubro', referencedColumnName: 'id' })
  rubro: Persona;

  @OneToMany(() => RedSocial, (redSocial) => redSocial.comercio, {
    eager: true,
  })
  redesSociales: RedSocial[];

  @OneToMany(() => Producto, (producto) => producto.comercio)
  productos: Producto[];

  @OneToMany(
    () => PersonalComercio,
    (personalComercio) => personalComercio.comercio,
  )
  personalComercio: PersonalComercio;

  @OneToMany(() => Transaccion, (transacciones) => transacciones.comercio)
  transacciones: Transaccion[];

  // ****************HOOKs

  @BeforeInsert()
  addUuid() {
    this.uuid = uuidv4();
  }
}
