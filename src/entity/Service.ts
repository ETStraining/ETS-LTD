import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn("uuid")
    Serviceid!: string

    @Column()
    title!: string

    @Column("text")
    description!: string

    @Column({nullable:true})
    image?: string
    
    @Column()
    category!: string

    @Column("decimal")
    price!: number

    @Column()
    contactPerson!: string

    @Column()
    contactEmail!: string

    @Column()
    status!:string

    @CreateDateColumn()
    createdAt!: Date  // automatically set date when record created

    @UpdateDateColumn()
    updatedAt!: Date  // automatically set date when record updated

}