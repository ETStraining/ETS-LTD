import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  contactId: string;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column('text')
  @IsNotEmpty()
  message: string;

  @CreateDateColumn()
  submittedAt: Date;

  constructor(name: string, email: string, message: string) {
    this.contactId = uuidv4();
    this.name = name;
    this.email = email;
    this.message = message;
    this.submittedAt = new Date();
  }
}
