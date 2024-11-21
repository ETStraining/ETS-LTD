import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  contactId!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column("text")
  message!: string;

  @CreateDateColumn()
  submittedAt!: Date;
}
