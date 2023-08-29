import { RedSocial } from 'src/pluss/entities/red_social.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tipo_red_social', schema: 'parametrica' })
export class TipoRedSocial extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: number;

  @Column()
  icono: string;

  @OneToMany(() => RedSocial, (redSocial) => redSocial.tipoRedSocial)
  redesSociales: RedSocial[];
}
