import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { Usuario } from './usuario.entity';

@Entity({ name: 'rol', schema: 'seguridad' })
export class Rol extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;
}
