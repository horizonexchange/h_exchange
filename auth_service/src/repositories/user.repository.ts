import { Injectable } from "@nestjs/common";
import { RegisterDto } from "src/dtos/register.dto";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { User } from "src/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
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

    async createUser(input: RegisterDto): Promise<User | null> {
        
        const user: User = new User();

        user.firstName = input.firstName;
        user.lastName = input.lastName;
        user.phoneNumber = input.phoneNumber;
        user.password = await bcrypt.hash(input.password, 10);
        user.createdAt = new Date();
        user.updatedAt = new Date();

        this.ormUserRepo.save(user);

        return user;
    }
}