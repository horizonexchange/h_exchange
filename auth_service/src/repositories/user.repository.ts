import { HttpException, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository {
    constructor(
        private readonly ormUserRepo: Repository<User>,
    ) {}

    async findOnPhone(phone: string): Promise<User | null> { // phone is the unique key in the user entity

        const user: User | null = await this.ormUserRepo.findOne({ 
            where: {
                phoneNumber: phone
            },
        })

        return user; 
    }
}