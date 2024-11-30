import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class ContactDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  message!: string;
}
