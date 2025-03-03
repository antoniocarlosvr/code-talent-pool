import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1720883407472 implements MigrationInterface {
  name = 'Initial1720883407472';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "loja" ("id" SERIAL NOT NULL, "descricao" character varying(60) NOT NULL, CONSTRAINT "PK_81ad5d6a90a7a01aa53b334cea9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produto" ("id" SERIAL NOT NULL, "descricao" character varying(60) NOT NULL, "custo" numeric(13,2), "imagem" bytea, CONSTRAINT "PK_99c4351f9168c50c0736e6a66be" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "produtoloja" ("id" integer GENERATED BY DEFAULT AS IDENTITY NOT NULL, "precovenda" numeric(13,2), "idproduto" integer NOT NULL, "idloja" integer NOT NULL, CONSTRAINT "PK_66ed310e837b5e92119fd2791dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtoloja" ADD CONSTRAINT "FK_0e9cc40d3a9fab16c7836a78e31" FOREIGN KEY ("idproduto") REFERENCES "produto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtoloja" ADD CONSTRAINT "FK_143d2a48ca9944ac89276ed144d" FOREIGN KEY ("idloja") REFERENCES "loja"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtoloja" DROP CONSTRAINT "FK_143d2a48ca9944ac89276ed144d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtoloja" DROP CONSTRAINT "FK_0e9cc40d3a9fab16c7836a78e31"`,
    );
    await queryRunner.query(`DROP TABLE "produtoloja"`);
    await queryRunner.query(`DROP TABLE "produto"`);
    await queryRunner.query(`DROP TABLE "loja"`);
  }
}
