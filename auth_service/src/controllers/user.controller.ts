import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { login200Response, login400Response } from "src/docs/login.doc";
import { register200Response, register400Response } from "src/docs/register.doc";
import { verify201Response, verify400Response } from "src/docs/verify.doc";
import { LoginDto } from "src/dtos/login.dto";
import { RegisterDto } from "src/dtos/register.dto";
import { VerifyDto } from "src/dtos/verify.dto";
import { UserExistPipe } from "src/pipes/UserExist.pipe";
import { UserService } from "src/services/user.service";

@Controller("auth")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @ApiResponse(register200Response)
    @ApiResponse(register400Response)
    @Post('register')
    @HttpCode(HttpStatus.OK)
    @UsePipes(UserExistPipe)
    async Register( // registering user and sending OTP endpoint, not creation of the user account
        @Body() input: RegisterDto, 
    ): Promise<any> {

        const result: string = await this.userService.Register(input);

        return { success: true, result };
    }

    @ApiResponse(verify201Response)
    @ApiResponse(verify400Response)
    @Post('verify')
    @HttpCode(HttpStatus.CREATED)
    async Verify( // verifying user with otp and phone number and creation of account
        @Body() input: VerifyDto, 
    ): Promise<any> {

        const result = await this.userService.Verify(input);

        return { success: true, user: result.user, tokens: result.tokens };
    }

    @ApiResponse(login200Response)
    @ApiResponse(login400Response)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async Login( // user logins, returned data is tokens
        @Body() input: LoginDto,
    ): Promise<any> {

        const result = await this.userService.Login(input);

        return { success: true, accessToken: result.accessToken, refreshToken: result.refreshToken };
    }

}