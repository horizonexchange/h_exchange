import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { RegisterDto } from "src/dtos/register.dto";
import { VerifyDto } from "src/dtos/verify.dto";
import { UserExistPipe } from "src/pipes/UserExist.pipe";
import { UserService } from "src/services/user.service";

@Controller("auth")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiResponse({
        status: 200,
        example: {
            success: true,
            result: "We sent a code to your phone number(09123456789)"
        },
        description: "registering user and sending OTP endpoint, not creation of the user account"
    })
    @ApiResponse({
        status: 400,
        example: {
            message: [
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            ],
            error: "Bad Request",
            statusCode: 400
        },
    })
    @Post('register')
    @HttpCode(HttpStatus.OK)
    @UsePipes(UserExistPipe)
    async Register( // registering user and sending OTP endpoint, not creation of the user account
        @Body() input: RegisterDto, 
    ): Promise<any> {

        const result: string = await this.userService.Register(input);

        return { success: true, result };
    }

    @ApiResponse({
        status: 201,
        example: {
            success: true,
            user: {
                firstName: "john",
                lastName: "doe",
                phoneNumber: "09123456789",
                createdAt: "2025-07-24T12:27:36.095Z",
                updatedAt: "2025-07-24T12:27:36.095Z"
            },
            tokens: {
                accessToken: "<access token>",
                refreshToken: "<refresh token>"
            },
        },
        description: "verifying user with otp and phone number and creation of account"
    })
    @ApiResponse({
        status: 400,
        example: {
            message: "there is a problem in verifying your otp code",
            error: "Bad Request",
            statusCode: 400
    }
    })
    @Post('verify')
    @HttpCode(HttpStatus.CREATED)
    async Verify( // verifying user with otp and phone number and creation of account
        @Body() input: VerifyDto, 
    ): Promise<any> {

        const result = await this.userService.Verify(input);

        return { success: true, user: result.user, tokens: result.tokens };
    }
}