import { Injectable } from '@nestjs/common';
import { Produto } from '../entity/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  findAll(): Promise<Produto[]> {
    return this.produtoRepository.find();
  }

  findId(id: number): Promise<Produto> {
    return this.produtoRepository.findOne({ where: { id } });
  }

  findDescricao(descricao: string): Promise<Produto[]> {
    return this.produtoRepository.find({ where: { descricao } });
  }

  findCusto(custo: number): Promise<Produto[]> {
    return this.produtoRepository.find({ where: { custo } });
  }

  update(id: number, data: UpdateProdutoDto) {
    return this.produtoRepository.update(id, data);
  }

  remove(id: number) {
    return this.produtoRepository.delete(id);
  }
}
