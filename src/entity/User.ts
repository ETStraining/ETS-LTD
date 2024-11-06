import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid') // Using UUID for better scalability
    id!: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    firstName?: string;

    @Column({ length: 50, nullable: true })
    lastName?: string;

    @Column({ type: 'int', nullable: true })
    age?: number;

    @Column({ type: "varchar", unique: true, nullable: false }) // Ensuring uniqueness for email
    email!: string;

    @Column({ type: "varchar", nullable: false }) // Non-nullable as password is mandatory
    password!: string;

    @Column({ default: false })
    isVerified!: boolean;

    @Column({ nullable: true })
    resetPasswordToken?: string;

    @Column({ nullable: true, type: 'timestamp' })
    resetPasswordExpires?: Date;

    @CreateDateColumn() // Automatically sets on creation
    createdAt!: Date;

    @UpdateDateColumn() // Automatically updates on save
    updatedAt!: Date;

    // Hash password before saving the user
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}

export interface UserPayload {
    id: string;
    email: string;
    isVerified: boolean; // Optional if you'd like to include it in the payload
}
