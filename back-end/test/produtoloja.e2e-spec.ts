import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProdutoLojaModule } from '../src/modules/produtoloja/produtoloja.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from '../src/modules/produtoloja/entity/produtoloja.entity';
import { Produto } from '../src/modules/produto/entity/produto.entity';
import { Loja } from '../src/modules/loja/entity/loja.entity';

describe('ProdutoLojaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [ProdutoLoja, Produto, Loja],
          synchronize: true,
        }),
        ProdutoLojaModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/produtoloja (POST)', () => {
    return request(app.getHttpServer())
      .post('/produtoloja')
      .send({ idProduto: 1, idLoja: 1, precoVenda: 100.0 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            idProduto: expect.any(Object),
            idLoja: expect.any(Object),
            precoVenda: 100.0,
          }),
        );
      });
  });

  it('/produtoloja (GET)', () => {
    return request(app.getHttpServer())
      .get('/produtoloja')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/produtoloja/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/produtoloja/1')
      .send({ precoVenda: 150.0 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            precoVenda: 150.0,
          }),
        );
      });
  });

  it('/produtoloja/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/produtoloja/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ affected: 1, raw: expect.any(Array) });
      });
  });
});
