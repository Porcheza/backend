import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTicketBoardTable1724575283339 implements MigrationInterface {
    name = 'InitTicketBoardTable1724575283339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" ADD "order" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ticket" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "ticket" DROP COLUMN "order"`);
    }

}
