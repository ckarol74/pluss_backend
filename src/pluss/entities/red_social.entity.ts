import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comercio } from './comercio.entity';
import { TipoRedSocial } from 'src/parametrica/entities/tipo_red_social';

@Entity({ name: 'red_social', schema: 'pluss' })
export class RedSocial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enlace: string;

  @Column({ name: 'id_comercio', type: 'bigint' })
  idComercio: number;

  @Column({ name: 'id_tipo_red_social', type: 'bigint' })
  idTipoRedSocial: number;

  @ManyToOne(() => Comercio, (comercio) => comercio.redesSociales)
  @JoinColumn({ name: 'id_comercio', referencedColumnName: 'id' })
  comercio: Comercio;

  @ManyToOne(
    () => TipoRedSocial,
    (tipoRedSocial) => tipoRedSocial.redesSociales,
    { eager: true },
  )
  @JoinColumn({ name: 'id_tipo_red_social', referencedColumnName: 'id' })
  tipoRedSocial: TipoRedSocial;
}
