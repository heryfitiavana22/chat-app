import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1694102235189 implements MigrationInterface {
    name = 'Migration1694102235189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`chat\` CHANGE \`isSeen\` \`isSeenByReceiver\` tinyint NOT NULL DEFAULT '0'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`chat\` CHANGE \`isSeenByReceiver\` \`isSeen\` tinyint NOT NULL DEFAULT '0'
        `);
    }

}
