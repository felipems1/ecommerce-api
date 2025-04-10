import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCity1744308439329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    
          CREATE TABLE public.city (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            state_id UUID NOT NULL,
            name VARCHAR NOT NULL,
            created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
            updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now() NOT NULL,
            CONSTRAINT fk_state FOREIGN KEY (state_id) REFERENCES public.state(id)
          );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DROP TABLE IF EXISTS public.city;
        `);
  }
}
