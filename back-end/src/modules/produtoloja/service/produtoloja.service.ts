import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Repository } from 'typeorm';
import { CreateProdutoLojaDto } from '../dto/create-produtoloja.dto';
import { Produto } from '../../produto/entity/produto.entity';
import { Loja } from '../../loja/entity/loja.entity';
import { UpdateProdutoLojaDto } from '../dto/update-produtoloja.dto';

@Injectable()
export class ProdutoLojaService {
  constructor(
    @InjectRepository(ProdutoLoja)
    private produtoLojaRepository: Repository<ProdutoLoja>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(Loja)
    private lojaRepository: Repository<Loja>,
  ) {}

  async create(
    createProdutoLojaDto: CreateProdutoLojaDto,
  ): Promise<ProdutoLoja> {
    const produto = await this.produtoRepository.findOne({
      where: { id: createProdutoLojaDto.idProduto },
    });

    const loja = await this.lojaRepository.findOne({
      where: { id: createProdutoLojaDto.idLoja },
    });

    const produtoLoja = this.produtoLojaRepository.create({
      idProduto: produto,
      idLoja: loja,
      precoVenda: createProdutoLojaDto.precoVenda,
    });

    return await this.produtoLojaRepository.save(produtoLoja);
  }

  findAll(): Promise<ProdutoLoja[]> {
    return this.produtoLojaRepository.find({
      relations: ['idProduto', 'idLoja'],
    });
  }

  findId(id: number): Promise<ProdutoLoja> {
    return this.produtoLojaRepository.findOne({
      where: { id },
      relations: ['idProduto', 'idLoja'],
    });
  }

  async update(
    id: number,
    updateProdutoLojaDto: UpdateProdutoLojaDto,
  ): Promise<ProdutoLoja> {
    const produtoLoja = await this.produtoLojaRepository.findOne({
      where: { id },
    });

    if (updateProdutoLojaDto.idProduto) {
      const produto = await this.produtoRepository.findOne({
        where: { id: updateProdutoLojaDto.idProduto },
      });
      produtoLoja.idProduto = produto;
    }

    if (updateProdutoLojaDto.idLoja) {
      const loja = await this.lojaRepository.findOne({
        where: { id: updateProdutoLojaDto.idLoja },
      });
      produtoLoja.idLoja = loja;
    }

    if (updateProdutoLojaDto.precoVenda !== undefined) {
      produtoLoja.precoVenda = updateProdutoLojaDto.precoVenda;
    }

    return this.produtoLojaRepository.save(produtoLoja);
  }

  remove(id: number) {
    return this.produtoLojaRepository.delete(id);
  }
}
