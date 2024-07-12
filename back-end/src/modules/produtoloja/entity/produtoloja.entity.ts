import { Loja } from '../../loja/entity/loja.entity';
import { Produto } from '../../produto/entity/produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProdutoLoja {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => Produto, (idProduto) => idProduto.id, { eager: true })
  idProduto: Produto;

  @ManyToOne(() => Loja, (idLoja) => idLoja.id, { eager: true })
  idLoja: Loja;

  @Column('decimal', { name: 'precovenda', precision: 13, scale: 2 })
  precoVenda: number;
}
