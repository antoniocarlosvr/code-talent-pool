import { Module } from '@nestjs/common';
import { ProdutolojaController } from './controller/produtoloja.controller';
import { ProdutolojaService } from './service/produtoloja.service';

@Module({
  controllers: [ProdutolojaController],
  providers: [ProdutolojaService],
})
export class ProdutolojaModule {}
