import { Auditoria } from 'src/common/entities/auditoria.entity';
import { ColumnNumericTransformer } from 'src/common/utils/handle.transform_data';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comercio } from './comercio.entity';

@Entity({ name: 'producto', schema: 'pluss' })
export class Producto extends Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column({
    transformer: new ColumnNumericTransformer(),
    nullable: false,
    type: 'numeric',
  })
  precio: number;

  @Column()
  activo: boolean;

  @Column()
  imagen: string;

  @Column({ name: 'id_comercio', type: 'bigint' })
  idComercio: number;

  @ManyToOne(() => Comercio, (comercio) => comercio.productos)
  @JoinColumn({ name: 'id_comercio', referencedColumnName: 'id' })
  comercio: Comercio;
}
