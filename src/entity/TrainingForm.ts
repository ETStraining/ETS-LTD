import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TrainingForm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  fullName!: string;

  @Column({ type: "varchar", length: 15 })
  phoneNumber!: string;

  @Column({ type: "varchar", length: 255, unique: true })
  emailAddress!: string;

  @Column({ type: "varchar", length: 255 })
  trainingCourse!: string;
}

export default TrainingForm; // Add this line if you want to use default export
