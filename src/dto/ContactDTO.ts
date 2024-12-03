import { IsEmail, IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class ContactDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  company!: string; // Added the missing 'company' field

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 15)
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: "Phone number must be a valid international format" })
  phoneNumber!: string; // Added the missing 'phoneNumber' field with validation

  @IsNotEmpty()
  @IsString()
  @Length(10, 500)
  message!: string;
}
