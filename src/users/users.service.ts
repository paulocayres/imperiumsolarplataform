// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Perfil } from './perfil.entity';



@Injectable()
export class UsersService {
  private readonly users: any[];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Perfil)
    private readonly perfisRepository: Repository<User>) {



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
    return this.usersRepository.findOne({ username });
  }

  findPerfil(username: string): Promise<User> {
    return this.usersRepository.findOne({ username }, { relations: ['perfil'] });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user): Promise<void> {
    await bcrypt.hash(user.password, 10, async (err, hash) => {
      user.password = hash;
      const perfil = await this.perfisRepository.findOne(user.perfilId);
      user.perfil = perfil;
      this.usersRepository.insert(user);
    });
  }
}
