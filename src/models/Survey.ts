import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToOne } from "typeorm"
import { v4 as uuidv4 } from "uuid"

@Entity("surveys")
export default class Survey {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}