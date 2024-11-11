import { Entity,PrimaryGeneratedColumn,Column, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity()

export class Course {

@PrimaryGeneratedColumn("uuid")
Courseid!:string
   
@Column()
title!: string

@Column()
description!: string

@Column()
image!:string

@Column()
status!: string

@CreateDateColumn()
createdAt!: Date // automatically set date when record created

@UpdateDateColumn()
 updatedAt!: Date // automatically set date when record updated

@Column("integer")
duration!: number

@Column()
instructor!: string

@Column("text")
prerequisites!: string

@Column()
category!: string

}