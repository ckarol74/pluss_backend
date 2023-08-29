import { Auditoria } from 'src/common/entities/auditoria.entity';
import { ColumnNumericTransformer } from 'src/common/utils/handle.transform_data';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comercio } from './comercio.entity';
import { Cliente } from './cliente.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'transaccion', schema: 'pluss' })
export class Transaccion extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', nullable: false })
  uuid?: string;

  @Column({
    transformer: new ColumnNumericTransformer(),
    nullable: false,
    type: 'numeric',
  })
  puntos: number;

  @Column({
    transformer: new ColumnNumericTransformer(),
    nullable: false,
    type: 'numeric',
    name: 'monto_total',
  })
  montoTotal: number;

  @Column({
    nullable: false,
    type: 'boolean',
  })
  finalizado: boolean;

  @Column({
    nullable: false,
    type: 'text',
    name: 'nro_documento_cliente',
  })
  nroDocumentoCliente: string;

  @Column({ name: 'id_comercio', type: 'bigint', nullable: false })
  idComercio: number;

  @Column({ name: 'id_cliente', type: 'bigint', nullable: false })
  idCliente: number;

  @ManyToOne(() => Comercio, (comercio) => comercio.transacciones, {
    eager: true,
  })
  @JoinColumn({ name: 'id_comercio', referencedColumnName: 'id' })
  comercio: Comercio;

  @ManyToOne(() => Cliente, (cliente) => cliente.transacciones, { eager: true })
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @BeforeInsert()
  setTerminado() {
    this.finalizado = false;
    this.uuid = uuidv4();
  }
}
