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
  company!: string;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  email!: string;

  @Column("text")
  message!: string;

  @Column()
  phoneNumber!: string;

  @CreateDateColumn()
  submittedAt!: Date;
}
