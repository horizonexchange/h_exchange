import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserExistPipe implements PipeTransform {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {

    const isUserExist: User | null = await this.userRepository.findOnPhone(value.phoneNumber);

    if (isUserExist) throw new BadRequestException('there is a problem in registering the user');

    return value;
  }
}