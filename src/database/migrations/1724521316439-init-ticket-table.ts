import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTicketTable1724521316439 implements MigrationInterface {
    name = 'InitTicketTable1724521316439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "contact_info" text NOT NULL, "status" character varying(36) NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
