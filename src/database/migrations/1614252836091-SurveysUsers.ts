import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class SurveysUsers1614252836091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "surveys_users",
      columns: [
        {
          name: "id",
          type: "uuid",
          isPrimary: true,
          isNullable: false
        },
        {
          name: "user_id",
          type: "uuid",
          isNullable: false
        },
        {
          name: "survey_id",
          type: "uuid",
          isNullable: false
        },
        {
          name: "value",
          type: "number",
          isNullable: true
        },
        {
          name: "created_at",
          type: "timestamp",
          default: "now()"
        }
      ],
      foreignKeys: [
        {
          name: "fk_user_id",
          columnNames: ["user_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "users",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
        {
          name: "fk_survey_id",
          columnNames: ["survey_id"],
          referencedColumnNames: ["id"],
          referencedTableName: "surveys",
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys_users")
  }
}
