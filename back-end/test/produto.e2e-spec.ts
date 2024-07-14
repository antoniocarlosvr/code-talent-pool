import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from '../src/modules/produto/produto.module';
import { Produto } from '../src/modules/produto/entity/produto.entity';

describe('ProdutoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/produto (POST)', async () => {
    return request(app.getHttpServer())
      .post('/produto')
      .send({ descricao: 'Produto 1', custo: 5.0 })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            descricao: 'Produto 1',
            custo: 5.0,
          }),
        );
      });
  });

  it('/produto (GET)', async () => {
    return request(app.getHttpServer())
      .get('/produto')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/produto por id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/produto/search/id')
      .send({ id: 1 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });

  it('/produto por descricao (GET)', async () => {
    return request(app.getHttpServer())
      .get('/produto/search/descricao')
      .send({ descricao: 'Produto 1' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/produto por custo (GET)', async () => {
    return request(app.getHttpServer())
      .get('/produto/search/custo')
      .send({ custo: 5.0 })
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/produto/:id (PATCH)', async () => {
    return request(app.getHttpServer())
      .patch('/produto/1')
      .send({ descricao: 'Novo Produto' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          affected: 1,
          raw: expect.any(Array),
          generatedMaps: expect.any(Array),
        });
      });
  });

  it('/produto/:id (DELETE)', async () => {
    return request(app.getHttpServer())
      .delete('/produto/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ affected: 1, raw: expect.any(Array) });
      });
  });
});
