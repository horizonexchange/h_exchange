import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserExistPipe } from "src/pipes/UserExist.pipe";
import { UserRepository } from "src/repositories/user.repository";
import { UserService } from "src/services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserRepository, UserExistPipe]
})

export class UserModule {}