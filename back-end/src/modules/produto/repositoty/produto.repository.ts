import { Repository } from 'typeorm';
import { Produto } from '../entity/produto.entity';

export class ProdutoRepository extends Repository<Produto> {}
