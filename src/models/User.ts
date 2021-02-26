import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne } from "typeorm"
import { v4 as uuidv4 } from "uuid"

@Entity("users")
export default class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}