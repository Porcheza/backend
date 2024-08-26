import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTableTicket1724692540896 implements MigrationInterface {
    name = 'InitTableTicket1724692540896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "contact_info" text NOT NULL, "status" character varying(36) NOT NULL, "order" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
