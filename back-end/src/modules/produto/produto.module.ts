import { Module } from '@nestjs/common';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity';
import { ProdutoRepository } from './repositoty/produto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutoController],
  providers: [ProdutoService, ProdutoRepository],
  exports: [ProdutoService],
})
export class ProdutoModule {}
