import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from '../entity/loja.entity';
import { Like, Repository } from 'typeorm';
import { CreateLojaDto } from '../dto/create-loja.dto';
import { UpdateLojaDto } from '../dto/update-loja.dto';

@Injectable()
export class LojaService {
  constructor(
    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,
  ) {}

  create(createLojaDto: CreateLojaDto): Promise<Loja> {
    const loja = this.lojaRepository.create(createLojaDto);
    return this.lojaRepository.save(loja);
  }

  findAll(): Promise<Loja[]> {
    return this.lojaRepository.find();
  }

  findId(id: number): Promise<Loja> {
    return this.lojaRepository.findOne({ where: { id } });
  }

  findDescricao(descricaoBusca: string): Promise<Loja[]> {
    return this.lojaRepository.find({
      where: { descricao: Like(`%${descricaoBusca}%`) },
    });
  }

  update(id: number, data: UpdateLojaDto) {
    return this.lojaRepository.update(id, data);
  }

  remove(id: number) {
    return this.lojaRepository.delete(id);
  }
}
