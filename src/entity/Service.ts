import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}