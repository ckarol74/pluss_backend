import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class Auditoria extends BaseEntity {
  @DeleteDateColumn({
    name: 'fecha_eliminacion',
    nullable: false,
  })
  fechaEliminacion: Date;

  @CreateDateColumn({
    name: 'fecha_registro',
    select: false,
    nullable: false,
  })
  fechaRegistro: Date;

  @UpdateDateColumn({
    name: 'fecha_ultima_modificacion',
    select: false,
  })
  fechaUltimaModificacion: Date;

  @Column({
    name: 'usuario_registro',
    select: false,
    nullable: false,
  })
  usuarioRegistro?: string;

  @Column({
    name: 'usuario_ultima_modificacion',
    select: false,
    nullable: true,
  })
  usuarioUltimaModificacion?: string;

  // @BeforeInsert()
  // checkFieldsBeforeInsert() {
  //   if (!this.usuarioRegistro) this.usuarioRegistro = 'administrador';
  // }

  // @BeforeUpdate()
  // checkFieldsBeforeUpdate() {
  //   if (!this.usuarioUltimaModificacion)
  //     this.usuarioUltimaModificacion = 'administrador';
  // }
}
