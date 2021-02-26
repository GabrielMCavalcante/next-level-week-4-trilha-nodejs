import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Surveys1614166422280 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "surveys",
      columns: [
        {
          name: "id",
          type: "uuid",
          isNullable: false,
          isUnique: true,
          isPrimary: true
        },
        {
          name: "title",
          type: "varchar",
          isNullable: false
        },
        {
          name: "description",
          type: "varchar",
          isNullable: false
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys")
  }
}