import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProdutoLojaModule } from '../src/modules/produtoloja/produtoloja.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoLoja } from '../src/modules/produtoloja/entity/produtoloja.entity';
import { Produto } from '../src/modules/produto/entity/produto.entity';
import { Loja } from '../src/modules/loja/entity/loja.entity';
import { Repository } from 'typeorm';

describe('ProdutoLojaController (e2e)', () => {
  let app: INestApplication;
  let produtoRepository: Repository<Produto>;
  let lojaRepository: Repository<Loja>;

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

    produtoRepository = moduleFixture.get('ProdutoRepository');
    lojaRepository = moduleFixture.get('LojaRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('/produtoloja (POST)', async () => {
    const produto = await produtoRepository.save({
      descricao: 'Produto 1',
      custo: 5.0,
      imagem: Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]),
    });
    const loja = await lojaRepository.save({ descricao: 'Loja 1' });

    return request(app.getHttpServer())
      .post('/produtoloja')
      .send({ idProduto: produto.id, idLoja: loja.id, precoVenda: 100.0 })
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

  it('/produtoloja por id (GET)', () => {
    return request(app.getHttpServer())
      .get('/produtoloja')
      .send({ id: 1 })
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
