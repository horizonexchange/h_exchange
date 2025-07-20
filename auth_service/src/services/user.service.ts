import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { RegisterDto } from "src/dtos/register.dto";
import { User } from "src/entities/user.entity";
import { sendOtp } from "src/helpers/send_otp.helper";
import { UserRepository } from "src/repositories/user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject("REDIS_CLIENT") private readonly redisClient: Redis,
    ) {}

    // in this endpoint we send the otp code to user, that expires 2 minutes later.
    // i did this to prevent the creation of non-verified users.
    async Register(inputDto: RegisterDto) {
    
        const isUserExist: User | null = await this.userRepository.findOnPhone(inputDto.phoneNumber);

        if (isUserExist) throw new BadRequestException('there is a problem in registering the user');

        const otpCode: number = sendOtp(inputDto.phoneNumber); // sends the otp, returns the otp code

        // front-end should send an object like this:
        // { otp: 246342, phone: 09120000000 } then if otp is valid, the user will be created
        const getUserKey = { 
            otp: otpCode,
            phone: inputDto.phoneNumber
        };

        // two minutes expiration time
        await this.redisClient.set(JSON.stringify(getUserKey), JSON.stringify(inputDto), "EX", 120)

        return `We sent a code to your phone number(${inputDto.phoneNumber})`;
    }
}