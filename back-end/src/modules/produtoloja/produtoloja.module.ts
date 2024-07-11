import { Module } from '@nestjs/common';
import { ProdutoLojaController } from './controller/produtoloja.controller';
import { ProdutoLojaService } from './service/produtoloja.service';
import { ProdutoLoja } from './entity/produtoloja.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../produto/entity/produto.entity';
import { Loja } from '../loja/entity/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoLoja, Produto, Loja])],
  controllers: [ProdutoLojaController],
  providers: [ProdutoLojaService],
})
export class ProdutolojaModule {}
