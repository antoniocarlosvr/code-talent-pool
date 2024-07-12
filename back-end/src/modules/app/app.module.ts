import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from '../produto/produto.module';
import { LojaModule } from '../loja/loja.module';
import { ProdutoLojaModule } from '../produtoloja/produtoloja.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    ProdutoModule,
    LojaModule,
    ProdutoLojaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
