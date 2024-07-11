import { Loja } from '../../loja/entity/loja.entity';
import { Produto } from '../../produto/entity/produto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProdutoLoja {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produto, { eager: true })
  @JoinColumn({ name: 'id_produto' })
  idProduto: Produto;

  @ManyToOne(() => Loja, { eager: true })
  @JoinColumn({ name: 'id_loja' })
  idLoja: Loja;

  @Column('decimal', { precision: 13, scale: 2 })
  precoVenda: number;
}
