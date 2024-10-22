import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { User } from '../../databases/entities';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findByAttribute(findOption: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(findOption);
  }

  async findOneByAttribute(findOption: FindOneOptions<User>): Promise<User> {
    return this.userRepository.findOne(findOption);
  }

  async detail(id: string): Promise<User> {
    return this.findOneByAttribute({ where: { id } });
  }
}
