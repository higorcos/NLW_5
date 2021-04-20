import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSettings1618938791121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(  //a tabela vai ser criada 
            new Table({
                name: "settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid", //id universal 
                        isPrimary: true
                    },
                    { 
                        name: "username",
                        type: "varchar"
                    },
                    {
                        name: "chat",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('settings') //tabela vai ser removida
    }

}
