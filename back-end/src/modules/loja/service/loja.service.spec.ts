import { Test, TestingModule } from '@nestjs/testing';
import { LojaService } from './loja.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../entity/loja.entity';
import { LojaModule } from '../loja.module';

describe('LojaService', () => {
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

    service = module.get<LojaService>(LojaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('cria uma nova loja', async () => {
      const createLojaDto = {
        id: 1,
        descricao: 'Loja 1',
      };

      const loja = await service.create(createLojaDto);

      expect(loja).toBeDefined();
      expect(loja.descricao).toBe(createLojaDto.descricao);
    });
  });

  describe('findAll', () => {
    it('retorna todas as lojas', async () => {
      const lojas = await service.findAll();

      expect(lojas).toBeInstanceOf(Array);
    });
  });

  describe('findId', () => {
    it('retorna uma loja pelo id', async () => {
      const createLojaDto = {
        id: 1,
        descricao: 'Loja 1',
      };

      const updateLoja = await service.create(createLojaDto);
      const loja = await service.findId(updateLoja.id);

      expect(loja).toBeDefined();
      expect(loja.id).toBe(updateLoja.id);
    });
  });

  describe('findDescricao', () => {
    it('retorna uma loja pela descricao', async () => {
      const descricao = 'Loja 1';
      await service.create({
        id: 1,
        descricao,
      });

      const loja = await service.findDescricao(descricao);

      expect(loja).toBeInstanceOf(Array);
      expect(loja.length).toBeGreaterThan(0);
      expect(loja[0].descricao).toBe(descricao);
    });
  });

  describe('update', () => {
    it('atualiza a loja', async () => {
      const createLojaDto = {
        id: 1,
        descricao: 'Loja 1',
      };
      const newLoja = await service.create(createLojaDto);

      const updateLojaDto = {
        id: 1,
        descricao: 'Loja atualizada',
      };

      await service.update(newLoja.id, updateLojaDto);

      const loja = await service.findId(newLoja.id);

      expect(loja).toBeDefined();
      expect(loja.descricao).toBe(updateLojaDto.descricao);
    });
  });

  describe('remove', () => {
    it('deleta a loja', async () => {
      const createLojaDto = {
        id: 1,
        descricao: 'Loja 1',
      };
      const newLoja = await service.create(createLojaDto);

      await service.remove(newLoja.id);

      const loja = await service.findId(newLoja.id);

      expect(loja).toBeNull();
    });
  });
});
