import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoLojaController } from './produtoloja.controller';
import { ProdutoLojaService } from '../service/produtoloja.service';
import { CreateProdutoLojaDto } from '../dto/create-produtoloja.dto';
import { UpdateProdutoLojaDto } from '../dto/update-produtoloja.dto';

describe('ProdutoLojaController', () => {
  let controller: ProdutoLojaController;
  let service: ProdutoLojaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoLojaController],
      providers: [
        {
          provide: ProdutoLojaService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findId: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProdutoLojaController>(ProdutoLojaController);
    service = module.get<ProdutoLojaService>(ProdutoLojaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new ProdutoLoja', async () => {
      const createProdutoLojaDto: CreateProdutoLojaDto = {
        id: 1,
        idProduto: 1,
        idLoja: 1,
        precoVenda: 100.0,
      };

      const produtoLoja = { id: 1, ...createProdutoLojaDto };

      jest.spyOn(service, 'create').mockResolvedValue(produtoLoja as any);

      const result = await controller.create(createProdutoLojaDto);

      expect(result).toBe(produtoLoja);
      expect(service.create).toHaveBeenCalledWith(createProdutoLojaDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of ProdutoLoja', async () => {
      const produtoLoja = { id: 1, idProduto: 1, idLoja: 1, precoVenda: 100.0 };

      jest.spyOn(service, 'findAll').mockResolvedValue([produtoLoja] as any);

      const result = await controller.findAll();

      expect(result).toEqual([produtoLoja]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOneById', () => {
    it('should return a single ProdutoLoja by id', async () => {
      const id = 1;
      const produtoLoja = { id, idProduto: 1, idLoja: 1, precoVenda: 100.0 };

      jest.spyOn(service, 'findId').mockResolvedValue(produtoLoja as any);

      const result = await controller.findOneById(id);

      expect(result).toBe(produtoLoja);
      expect(service.findId).toHaveBeenCalledWith(id);
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

      const updatedProdutoLoja = { id, ...updateProdutoLojaDto };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(updatedProdutoLoja as any);

      const result = await controller.update(id, updateProdutoLojaDto);

      expect(result).toBe(updatedProdutoLoja);
      expect(service.update).toHaveBeenCalledWith(id, updateProdutoLojaDto);
    });
  });

  describe('remove', () => {
    it('should remove a ProdutoLoja', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockResolvedValue({ affected: 1 } as any);

      const result = await controller.remove(id);

      expect(result).toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
