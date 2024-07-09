import { Module } from '@nestjs/common';
import { ProdutolojaController } from './produtoloja.controller';
import { ProdutolojaService } from './produtoloja.service';

@Module({
  controllers: [ProdutolojaController],
  providers: [ProdutolojaService],
})
export class ProdutolojaModule {}
