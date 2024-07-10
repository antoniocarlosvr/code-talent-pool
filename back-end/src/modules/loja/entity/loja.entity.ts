import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  descricao: string;
}
