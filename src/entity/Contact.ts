import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length, IsEmail } from "class-validator";

@Entity()
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(2, 100)
    name: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @Length(10, 500)
    message: string;
}
