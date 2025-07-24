import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/controllers/user.controller";
import { User } from "src/entities/user.entity";
import { UserExistPipe } from "src/pipes/UserExist.pipe";
import { UserRepository } from "src/repositories/user.repository";
import { UserService } from "src/services/user.service";
import { Repository } from "typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: "Zp8XmU!sc-B#4!Em"
        })
    ],
    providers: [UserService, UserRepository, UserExistPipe, Repository<User>],
    controllers: [UserController]
})

export class UserModule {}