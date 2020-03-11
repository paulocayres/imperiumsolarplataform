// src/users/users.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  private readonly users: any[];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>) {



/*     this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        pet: { name: 'alfred', picId: 1 },
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        pet: { name: 'gopher', picId: 2 },
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        pet: { name: 'jenny', picId: 3 },
      },
    ]; */



  }
/* 
  async findOne(username: string): Promise<any> {
    return this.users.find(user => user.username === username);
  } */


  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ username: username});;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: User): Promise<void> {
    await this.usersRepository.create(user);
  }
}
