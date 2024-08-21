import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTableTicket1724262819706 implements MigrationInterface {
    name = 'InitTableTicket1724262819706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ticket" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text, "contact_info" text NOT NULL, "status" "public"."ticket_status_enum" NOT NULL, CONSTRAINT "PK_d9a0835407701eb86f874474b7c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ticket"`);
    }

}
