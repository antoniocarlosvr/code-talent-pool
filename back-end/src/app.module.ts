import { Module } from '@nestjs/common';
import { ProdutoModule } from './modules/produto/produto.module';
import { LojaModule } from './modules/loja/loja.module';
import { ProdutoLojaModule } from './modules/produtoloja/produtoloja.module';
// import { ConfigModule } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { DatabaseConfig } from 'src/config/database.config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ProdutoModule, LojaModule, ProdutoLojaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
