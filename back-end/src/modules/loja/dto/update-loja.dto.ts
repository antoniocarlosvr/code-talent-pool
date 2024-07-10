import { CreateLojaDto } from './create-loja.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLojaDto extends PartialType(CreateLojaDto) {}
