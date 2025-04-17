import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableState1744308425383 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.state (
        id INTEGER PRIMARY KEY,            
        uf VARCHAR(2) NOT NULL,           
        name VARCHAR NOT NULL,
        created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
        updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS public.state;
    `);
  }
}
