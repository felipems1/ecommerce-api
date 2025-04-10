import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableAddress1744308456060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    
          CREATE TABLE public.address (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_id UUID NOT NULL,
            complement VARCHAR,
            number INTEGER NOT NULL,
            cep VARCHAR NOT NULL,
            city_id UUID NOT NULL,
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user(id),
            CONSTRAINT fk_city FOREIGN KEY (city_id) REFERENCES public.city(id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE IF EXISTS public.address;
        `);
  }
}
