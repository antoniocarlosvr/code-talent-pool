import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 60, nullable: false })
  descricao: string;

  @Column('decimal', { precision: 13, scale: 2, nullable: true })
  custo: number;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'blob' : 'bytea',
    nullable: true,
  })
  imagem: Buffer;
}
