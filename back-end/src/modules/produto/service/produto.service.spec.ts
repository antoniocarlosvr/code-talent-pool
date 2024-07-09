import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { Repository } from 'typeorm';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { ProdutoController } from '../controller/produto.controller';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [ProdutoService, Repository],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new produto', async () => {
      const createProdutoDto: CreateProdutoDto = {
        id: 1,
        descricao: 'Produto 1',
        custo: 10.99,
      };

      const produto = await service.create(createProdutoDto);

      expect(produto).toBeDefined();
      expect(produto.descricao).toBe(createProdutoDto.descricao);
      expect(produto.custo).toBe(createProdutoDto.custo);
    });
  });

  describe('findAll', () => {
    it('should return an array of produtos', async () => {
      const produtos = await service.findAll();

      expect(produtos).toBeInstanceOf(Array);
      expect(produtos.length).toBeGreaterThan(0);
    });
  });

  describe('findId', () => {
    it('should return a produto by id', async () => {
      const id = 1;
      const produto = await service.findId(id);

      expect(produto).toBeDefined();
      expect(produto.id).toBe(id);
    });
  });

  describe('findDescricao', () => {
    it('should return an array of produtos by descricao', async () => {
      const descricao = 'Produto 1';
      const produtos = await service.findDescricao(descricao);

      expect(produtos).toBeInstanceOf(Array);
      expect(produtos.length).toBeGreaterThan(0);
      expect(produtos[0].descricao).toBe(descricao);
    });
  });

  describe('findCusto', () => {
    it('should return an array of produtos by custo', async () => {
      const custo = 10.99;
      const produtos = await service.findCusto(custo);

      expect(produtos).toBeInstanceOf(Array);
      expect(produtos.length).toBeGreaterThan(0);
      expect(produtos[0].custo).toBe(custo);
    });
  });

  describe('update', () => {
    it('should update a produto', async () => {
      const id = 1;
      const updateProdutoDto: UpdateProdutoDto = {
        descricao: 'Produto 1 Updated',
        custo: 12.99,
      };

      await service.update(id, updateProdutoDto);

      const produto = await service.findId(id);

      expect(produto).toBeDefined();
      expect(produto.descricao).toBe(updateProdutoDto.descricao);
      expect(produto.custo).toBe(updateProdutoDto.custo);
    });
  });

  describe('remove', () => {
    it('should remove a produto', async () => {
      const id = 1;

      await service.remove(id);

      const produto = await service.findId(id);

      expect(produto).toBeUndefined();
    });
  });
});
