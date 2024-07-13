import { Loja } from '../../loja/entity/loja.entity';
import { Produto } from '../../produto/entity/produto.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('produtoloja')
export class ProdutoLoja {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Produto, (idProduto) => idProduto.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'idproduto' })
  idProduto: Produto;

  @ManyToOne(() => Loja, (idLoja) => idLoja.id, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'idloja' })
  idLoja: Loja;

  @Column('decimal', {
    name: 'precovenda',
    precision: 13,
    scale: 2,
    nullable: true,
  })
  precoVenda: number;
}
