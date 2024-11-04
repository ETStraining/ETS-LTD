import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Training {
    @PrimaryGeneratedColumn('uuid')
    trainingId: string;
  
    @Column()
    title: string;
  
    @Column('text')
    description: string;
  
    @Column('timestamp')
    startDate: Date;
  
    @Column('timestamp')
    endDate: Date;
  
    @Column()
    location: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  