import { BadRequestException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import Redis from "ioredis";
import { LoginDto } from "src/dtos/login.dto";
import { RegisterDto } from "src/dtos/register.dto";
import { VerifyDto } from "src/dtos/verify.dto";
import { User } from "src/entities/user.entity";
import { UsersRole } from "src/enums/roles.enum";
import { sendOtp } from "src/helpers/send_otp.helper";
import { UserRepository } from "src/repositories/user.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject("REDIS_CLIENT") private readonly redisClient: Redis,
        private readonly jwtService: JwtService,
    ) {}

    // in this endpoint we send the otp code to user, that expires 2 minutes later.
    // i did this to prevent the creation of non-verified users.
    async Register(inputDto: RegisterDto) {
    
        const isUserExist: User | null = await this.userRepository.findOnPhone(inputDto.phoneNumber);

        if (isUserExist) throw new BadRequestException('there is a problem in registering the user');

        const otpCode: number = sendOtp(inputDto.phoneNumber); // sends the otp, returns the otp code

        // front-end should send an object like this:
        // { otp_and_phone: 09100000000:642349 } then if otp is valid, the user will be created
        const getUserKey: string = inputDto.phoneNumber.concat(":", String(otpCode))

        console.log(getUserKey);

        // two minutes expiration time
        await this.redisClient.set(getUserKey, JSON.stringify(inputDto), "EX", 120)

        return `We sent a code to your phone number(${inputDto.phoneNumber})`;
    }

    // in this endpoint, after front-end sent otp and phone number, we validate and check
    // if there is an active otp for them or not, since otp gets deleted after 2 minutes
    // then if it exists, we make the user account.
    async Verify(input: VerifyDto): Promise<any> {

        // raw json user data
        let value: string | null = await this.redisClient.get(input.otp_and_phone)
        if (!value) throw new BadRequestException('there is a problem in verifying your otp code');

        // user data will bond to this if the otp exist
        let userData: RegisterDto = JSON.parse(value);

        const user: User | null = await this.userRepository.createUser(userData);
        if (!user) throw new InternalServerErrorException('there is a problem in creating your account');

        await this.redisClient.del(input.otp_and_phone);

        const accessToken: string = this.jwtService.sign(
            {
                user_id: user.id,
                role: UsersRole.normal
            },
            {
                expiresIn: "15m",
                secret: process.env.JWT_ACCESS_SECRET
            }
        )
        const { password, ...safeUser } = user;

        const refreshToken: string = this.jwtService.sign(
            {
                user_id: user.id,
                role: UsersRole.normal
            },
            {
                expiresIn: "90d",
                secret: process.env.JWT_REFRESH_SECRET,
            }
        )

        return { // created users and tokens are the response
            user: safeUser,
            tokens: {
                accessToken,
                refreshToken
            }
        };

    }

    async Login(input: LoginDto): Promise<any> { // Login service method, returns the tokens

        const isUserExist: User | null = await this.userRepository.findOnPhone(input.phoneNumber);

        if (!isUserExist) throw new BadRequestException('there is a problem in registering the user');

        const hashedPassword: string = await bcrypt.hash(input.password, 10);
        const isPasswordMatch: boolean = await bcrypt.compare(hashedPassword, isUserExist.password);
        if (!isPasswordMatch) throw new BadRequestException("wrong phone number or password");

        const accessToken: string = this.jwtService.sign(
            {
                user_id: isUserExist.id,
                role: UsersRole.normal
            },
            {
                expiresIn: "15m",
                secret: process.env.JWT_ACCESS_SECRET
            }
        )
        
        const { password, ...safeUser } = isUserExist;

        const refreshToken: string = this.jwtService.sign(
            {
                user_id: isUserExist.id,
                role: UsersRole.normal
            },
            {
                expiresIn: "90d",
                secret: process.env.JWT_REFRESH_SECRET,
            }
        )

        return { accessToken, refreshToken }
    }

}