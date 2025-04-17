import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableCity1744308439329 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE public.city (
        id INTEGER PRIMARY KEY,            
        state_id INTEGER NOT NULL,         
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
