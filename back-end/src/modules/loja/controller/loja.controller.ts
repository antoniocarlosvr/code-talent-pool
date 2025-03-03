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
import { LojaService } from '../service/loja.service';
import { CreateLojaDto } from '../dto/create-loja.dto';
import { UpdateLojaDto } from '../dto/update-loja.dto';

@Controller('loja')
export class LojaController {
  constructor(private readonly lojaService: LojaService) {}

  @Post()
  create(@Body() createLojaDto: CreateLojaDto) {
    return this.lojaService.create(createLojaDto);
  }

  @Get()
  findAll() {
    return this.lojaService.findAll();
  }

  @Get('search/id')
  findById(@Query('id') id: number) {
    return this.lojaService.findId(id);
  }

  @Get('search/descricao')
  findByDescricao(@Query('descricao') descricao: string) {
    return this.lojaService.findDescricao(descricao);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLojaDto: UpdateLojaDto) {
    return this.lojaService.update(id, updateLojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.lojaService.remove(id);
  }
}
