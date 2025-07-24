import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

export class VerifyDto {

    /**
     * @example 742658:09123456789 
     */
    @IsString()
    @IsNotEmpty({ message: "otp is required" })
    otp_and_phone: string;
}