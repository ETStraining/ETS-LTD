import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Training {
    @PrimaryGeneratedColumn("uuid")
    trainingId: string;
  
    @Column({ type: "varchar", length: 255 })
    title: string;
  
    @Column({ type: "text" })
    description: string;
  
    @Column({ type: "timestamp" })
    startDate: Date;
  
    @Column({ type: "timestamp" })
    endDate: Date;
  
    @Column({ type: "varchar", length: 255 })
    location: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  