import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../entity/produto.entity';
import { ProdutoModule } from '../produto.module';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Produto],
          synchronize: true,
        }),
        ProdutoModule,
      ],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('cria um novo produto', async () => {
      const createProdutoDto = {
        id: 1,
        descricao: 'Produto 1',
        custo: 10.99,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      };

      const produto = await service.create(createProdutoDto);

      expect(produto).toBeDefined();
      expect(produto.descricao).toBe(createProdutoDto.descricao);
      expect(produto.custo).toBe(parseFloat(createProdutoDto.custo.toFixed(2)));
    });
  });

  describe('findAll', () => {
    it('retorna uma lista de produtos', async () => {
      const produtos = await service.findAll();

      expect(produtos).toBeInstanceOf(Array);
    });
  });

  describe('findId', () => {
    it('retorna o produto pelo id', async () => {
      const createProdutoDto = {
        id: 1,
        descricao: 'Produto 1',
        custo: 10.99,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      };

      const newProduto = await service.create(createProdutoDto);
      const produto = await service.findId(newProduto.id);

      expect(produto).toBeDefined();
      expect(produto.id).toBe(newProduto.id);
    });
  });

  describe('findDescricao', () => {
    it('retorna os produtos pela descricao', async () => {
      const descricao = 'Produto 1';
      await service.create({
        id: 1,
        descricao,
        custo: 10.99,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      });

      const produtos = await service.findDescricao(descricao);

      expect(produtos).toBeInstanceOf(Array);
      expect(produtos.length).toBeGreaterThan(0);
      expect(produtos[0].descricao).toBe(descricao);
    });
  });

  describe('findCusto', () => {
    it('retorna os produtos pelo custo', async () => {
      const custo = 10.99;
      await service.create({
        id: 1,
        descricao: 'Produto 1',
        custo,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      });

      const produtos = await service.findCusto(custo);

      expect(produtos).toBeInstanceOf(Array);
      expect(produtos.length).toBeGreaterThan(0);
      expect(parseFloat(produtos[0].custo.toFixed(2))).toBe(
        parseFloat(custo.toFixed(2)),
      );
    });
  });

  describe('update', () => {
    it('atualiza o produto', async () => {
      const createProdutoDto = {
        id: 1,
        descricao: 'Produto 1',
        custo: 10.99,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      };
      const newProduto = await service.create(createProdutoDto);

      const updateProdutoDto = {
        id: 1,
        descricao: 'Produto 1 Updated',
        custo: 12.99,
      };

      await service.update(newProduto.id, updateProdutoDto);

      const produto = await service.findId(newProduto.id);

      expect(produto).toBeDefined();
      expect(produto.descricao).toBe(updateProdutoDto.descricao);
      expect(parseFloat(produto.custo.toFixed(2))).toBe(
        parseFloat(updateProdutoDto.custo.toFixed(2)),
      );
    });
  });

  describe('remove', () => {
    it('deleta o produto', async () => {
      const createProdutoDto = {
        id: 1,
        descricao: 'Produto 1',
        custo: 10.99,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      };
      const newProduto = await service.create(createProdutoDto);

      await service.remove(newProduto.id);

      const produto = await service.findId(newProduto.id);

      expect(produto).toBeNull();
    });
  });
});
