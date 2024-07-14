import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from '../src/modules/produtoloja/entity/produtoloja.entity';
import { Produto } from '../src/modules/produto/entity/produto.entity';
import { Loja } from '../src/modules/loja/entity/loja.entity';

export const typeOrmTestConfig = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: ':memory:',
  entities: [ProdutoLoja, Produto, Loja],
  synchronize: true,
});
