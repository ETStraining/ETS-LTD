import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid') // Using UUID for better scalability
    id!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
firstName!: string;


    @Column({ length: 50, nullable: true })
    lastName!: string;

    @Column({ type: 'int' })
    age!: number;

    @Column({ type: "varchar", nullable: true })
    email!: string;

    @Column({ type: "varchar", nullable: true })
password!: string;

    @Column({ default: false })
    isVerified!: boolean;

    @Column({ nullable: true })
    resetPasswordToken!: string;

    @Column({ nullable: true, type: 'timestamp' })
    resetPasswordExpires!: Date;

    @CreateDateColumn() // Automatically sets on creation
    createdAt!: Date;

    @UpdateDateColumn() // Automatically updates on save
    updatedAt!: Date;
}
