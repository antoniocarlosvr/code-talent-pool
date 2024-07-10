import { Test, TestingModule } from '@nestjs/testing';
import { ProdutolojaController } from './produtoloja.controller';

describe('ProdutolojaController', () => {
  let controller: ProdutolojaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutolojaController],
    }).compile();

    controller = module.get<ProdutolojaController>(ProdutolojaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
