import { Module } from '@nestjs/common';
import { LojaController } from './controller/loja.controller';
import { LojaService } from './service/loja.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entity/loja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loja])],
  controllers: [LojaController],
  providers: [LojaService],
  exports: [LojaService],
})
export class LojaModule {}
