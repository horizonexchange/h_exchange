import { Body, Controller, Get, HttpCode, HttpStatus, Post, UsePipes } from "@nestjs/common";
import { RegisterDto } from "src/dtos/register.dto";
import { UserExistPipe } from "src/pipes/UserExist.pipe";
import { UserService } from "src/services/user.service";

@Controller("auth")
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('register')
    @HttpCode(HttpStatus.ACCEPTED)
    @UsePipes(UserExistPipe)
    async Register( // registering user and sending OTP endpoint, not creation of the user account
        @Body() input: RegisterDto, 
    ): Promise<any> {

        const result: string = await this.userService.Register(input);

        return { success: true, result };
    }
}