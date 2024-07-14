import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from '../service/produto.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../entity/produto.entity';
import { ProdutoModule } from '../produto.module';

describe('ProdutoController', () => {
  let controller: ProdutoController;
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

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create method on service', async () => {
      const createProdutoDto: CreateProdutoDto = {
        id: 1,
        descricao: 'Produto 1',
        custo: 10.99,
        imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
      };
      const spy = jest.spyOn(service, 'create');
      await controller.create(createProdutoDto);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should call findAll method on service', async () => {
      const spy = jest.spyOn(service, 'findAll');
      await controller.findAll();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('should call findId method on service', async () => {
      const id = 1;
      const spy = jest.spyOn(service, 'findId');
      await controller.findOneById(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByDescricao', () => {
    it('should call findDescricao method on service', async () => {
      const descricao = 'Produto 1';
      const spy = jest.spyOn(service, 'findDescricao');
      await controller.findOneByDescricao(descricao);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByCusto', () => {
    it('should call findCusto method on service', async () => {
      const custo = 10.99;
      const spy = jest.spyOn(service, 'findCusto');
      await controller.findOneByCusto(custo);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call update method on service', async () => {
      const id = 1;
      const updateProdutoDto: UpdateProdutoDto = {
        descricao: 'Produto 1 Updated',
        custo: 12.99,
      };
      const spy = jest.spyOn(service, 'update');
      await controller.update(id, updateProdutoDto);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should call remove method on service', async () => {
      const id = 1;
      const spy = jest.spyOn(service, 'remove');
      await controller.remove(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
