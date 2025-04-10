import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1744306221763 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
  
        CREATE TABLE public.user (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          cpf VARCHAR NOT NULL,
          type_user INT NOT NULL,
          phone VARCHAR NOT NULL,
          password VARCHAR NOT NULL,
          created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
          updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL
        );
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP TABLE IF EXISTS public.user;
      `);
  }
}
