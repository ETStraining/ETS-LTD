import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Training {
  @PrimaryGeneratedColumn("uuid")
  trainingId: string = uuidv4();

  @Column()
  title: string;

  @Column("text")
  description: string;

  @Column("text")
  message: string;

  @Column()
  location: string;

  @Column("date")
  startDate: Date;

  @Column("date")
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(
    title: string,
    description: string,
    message: string,
    location: string,
    startDate: Date,
    endDate: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.trainingId = uuidv4();
    this.title = title;
    this.description = description;
    this.message = message;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}
