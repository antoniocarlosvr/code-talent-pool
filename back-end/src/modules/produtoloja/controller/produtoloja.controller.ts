import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProdutoLojaDto } from '../dto/create-produtoloja.dto';
import { ProdutoLojaService } from '../service/produtoloja.service';
import { UpdateProdutoLojaDto } from '../dto/update-produtoloja.dto';

@Controller('produtoloja')
export class ProdutoLojaController {
  constructor(private readonly produtoLojaService: ProdutoLojaService) {}

  @Post()
  create(@Body() createProdutoLojaDto: CreateProdutoLojaDto) {
    return this.produtoLojaService.create(createProdutoLojaDto);
  }

  @Get()
  findAll() {
    return this.produtoLojaService.findAll();
  }

  @Get('search/id')
  findOneById(@Query('id') id: number) {
    return this.produtoLojaService.findId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProdutoLojaDto: UpdateProdutoLojaDto,
  ) {
    return this.produtoLojaService.update(id, updateProdutoLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produtoLojaService.remove(id);
  }
}
