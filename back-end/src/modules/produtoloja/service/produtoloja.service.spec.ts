import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoLojaService } from './produtoloja.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutoLoja } from '../entity/produtoloja.entity';
import { Produto } from '../../produto/entity/produto.entity';
import { Loja } from '../../loja/entity/loja.entity';
import { CreateProdutoLojaDto } from '../dto/create-produtoloja.dto';
import { UpdateProdutoLojaDto } from '../dto/update-produtoloja.dto';

describe('ProdutoLojaService', () => {
  let service: ProdutoLojaService;
  let produtoLojaRepository: Repository<ProdutoLoja>;
  let produtoRepository: Repository<Produto>;
  let lojaRepository: Repository<Loja>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutoLojaService,
        {
          provide: getRepositoryToken(ProdutoLoja),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Produto),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Loja),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProdutoLojaService>(ProdutoLojaService);
    produtoLojaRepository = module.get<Repository<ProdutoLoja>>(
      getRepositoryToken(ProdutoLoja),
    );
    produtoRepository = module.get<Repository<Produto>>(
      getRepositoryToken(Produto),
    );
    lojaRepository = module.get<Repository<Loja>>(getRepositoryToken(Loja));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ProdutoLoja', async () => {
      const createProdutoLojaDto: CreateProdutoLojaDto = {
        id: 1,
        idProduto: 1,
        idLoja: 1,
        precoVenda: 100.0,
      };

      const produto = new Produto();
      const loja = new Loja();
      const produtoLoja = new ProdutoLoja();

      jest.spyOn(produtoRepository, 'findOne').mockResolvedValue(produto);
      jest.spyOn(lojaRepository, 'findOne').mockResolvedValue(loja);
      jest.spyOn(produtoLojaRepository, 'create').mockReturnValue(produtoLoja);
      jest.spyOn(produtoLojaRepository, 'save').mockResolvedValue(produtoLoja);

      const result = await service.create(createProdutoLojaDto);

      expect(result).toBe(produtoLoja);
      expect(produtoLojaRepository.create).toHaveBeenCalledWith({
        idProduto: produto,
        idLoja: loja,
        precoVenda: createProdutoLojaDto.precoVenda,
      });
      expect(produtoLojaRepository.save).toHaveBeenCalledWith(produtoLoja);
    });
  });

  describe('findAll', () => {
    it('should return an array of ProdutoLoja', async () => {
      const produtoLoja = new ProdutoLoja();
      jest
        .spyOn(produtoLojaRepository, 'find')
        .mockResolvedValue([produtoLoja]);

      const result = await service.findAll();

      expect(result).toEqual([produtoLoja]);
      expect(produtoLojaRepository.find).toHaveBeenCalledWith({
        relations: ['idProduto', 'idLoja'],
      });
    });
  });

  describe('findId', () => {
    it('should return a single ProdutoLoja by id', async () => {
      const id = 1;
      const produtoLoja = new ProdutoLoja();
      jest
        .spyOn(produtoLojaRepository, 'findOne')
        .mockResolvedValue(produtoLoja);

      const result = await service.findId(id);

      expect(result).toBe(produtoLoja);
      expect(produtoLojaRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['idProduto', 'idLoja'],
      });
    });
  });

  describe('update', () => {
    it('should update a ProdutoLoja', async () => {
      const id = 1;
      const updateProdutoLojaDto: UpdateProdutoLojaDto = {
        idProduto: 2,
        idLoja: 2,
        precoVenda: 200.0,
      };

      const produtoLoja = new ProdutoLoja();
      const produto = new Produto();
      const loja = new Loja();

      jest
        .spyOn(produtoLojaRepository, 'findOne')
        .mockResolvedValue(produtoLoja);
      jest.spyOn(produtoRepository, 'findOne').mockResolvedValue(produto);
      jest.spyOn(lojaRepository, 'findOne').mockResolvedValue(loja);
      jest.spyOn(produtoLojaRepository, 'save').mockResolvedValue(produtoLoja);

      const result = await service.update(id, updateProdutoLojaDto);

      expect(result).toBe(produtoLoja);
      expect(produtoLojaRepository.save).toHaveBeenCalledWith(produtoLoja);
    });
  });

  describe('remove', () => {
    it('should remove a ProdutoLoja', async () => {
      const id = 1;
      jest
        .spyOn(produtoLojaRepository, 'delete')
        .mockResolvedValue({ affected: 1, raw: [] });

      const result = await service.remove(id);

      expect(result).toEqual({ affected: 1, raw: [] });
      expect(produtoLojaRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
