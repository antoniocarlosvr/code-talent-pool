import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoLojaDto } from './create-produtoloja.dto';

export class UpdateProdutoLojaDto extends PartialType(CreateProdutoLojaDto) {}
