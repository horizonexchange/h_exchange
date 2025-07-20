import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class VerifyDto {

    @IsNumber()
    @Length(6, 6, { message: "otp range is from 100000 to 999999" })
    @IsNotEmpty({ message: "otp is required" })
    otp: number;

    @IsString({ message: "Phone number must be a string" })
    @Length(11, 11, { message: "Phone number length is just 11" })
    @IsNotEmpty({ message: "Phone number is required" })
    phoneNumber: string;
}