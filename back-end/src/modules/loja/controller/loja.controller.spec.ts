import { Test, TestingModule } from '@nestjs/testing';
import { LojaController } from './loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../entity/loja.entity';
import { LojaModule } from '../loja.module';
import { LojaService } from '../service/loja.service';
import { CreateLojaDto } from '../dto/create-loja.dto';
import { UpdateLojaDto } from '../dto/update-loja.dto';

describe('LojaController', () => {
  let controller: LojaController;
  let service: LojaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [Loja],
          synchronize: true,
        }),
        LojaModule,
      ],
    }).compile();

    controller = module.get<LojaController>(LojaController);
    service = module.get<LojaService>(LojaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call create method on service', async () => {
      const createLojaDto: CreateLojaDto = {
        id: 1,
        descricao: 'Loja 1',
      };
      const spy = jest.spyOn(service, 'create');
      await controller.create(createLojaDto);
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
      await controller.findById(id);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneByDescricao', () => {
    it('should call findDescricao method on service', async () => {
      const descricao = 'Produto 1';
      const spy = jest.spyOn(service, 'findDescricao');
      await controller.findByDescricao(descricao);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should call update method on service', async () => {
      const id = 1;
      const updateLojaDto: UpdateLojaDto = {
        descricao: 'Loja 1 Updated',
      };
      const spy = jest.spyOn(service, 'update');
      await controller.update(id, updateLojaDto);
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
