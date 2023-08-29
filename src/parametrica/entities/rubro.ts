import { Comercio } from 'src/pluss/entities/comercio.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'rubro', schema: 'parametrica' })
export class Rubro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  icono: string;

  @OneToMany(() => Comercio, (comercio) => comercio.rubro)
  comercios: Comercio[];
}
