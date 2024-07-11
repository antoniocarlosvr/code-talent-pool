import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LojaModule } from '../src/modules/loja/loja.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from '../src/modules/loja/entity/loja.entity';

describe('LojaController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/loja (POST)', () => {
    return request(app.getHttpServer())
      .post('/loja')
      .send({ descricao: 'Loja 1' })
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            descricao: 'Loja 1',
          }),
        );
      });
  });

  it('/loja (GET)', () => {
    return request(app.getHttpServer())
      .get('/loja')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/loja/:id (PATCH)', () => {
    return request(app.getHttpServer())
      .patch('/loja/1')
      .send({ descricao: 'Loja atualizada' })
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            affected: 1,
            raw: expect.any(Array),
          }),
        );
      });
  });

  it('/loja/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/loja/1')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({ affected: 1, raw: expect.any(Array) });
      });
  });
});
