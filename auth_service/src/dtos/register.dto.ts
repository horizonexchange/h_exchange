import { IsNotEmpty, IsString, Length, Matches } from "class-validator";

export class RegisterDto {

    @IsString({ message: "First name must be a string" })
    @Length(3, 30, { message: "First name length is from 3 to 30" })
    @IsNotEmpty({ message: "First name is required" })
    firstName: string;

    @IsString({ message: "Last name must be a string" })
    @Length(3, 30, { message: "Last name length is from 3 to 30" })
    @IsNotEmpty({ message: "Last name is required" })
    lastName: string;

    @IsString({ message: "Phone number must be a string" })
    @Length(11, 11, { message: "Phone number length is just 11" })
    @IsNotEmpty({ message: "Phone number is required" })
    phoneNumber: string;

    @IsString({ message: "Password must be a string" })
    @Length(3, 30, { message: "Password length is from 8 to 50" })
    @IsNotEmpty({ message: "Password is required" })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
        message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
    })
    password: string;
}