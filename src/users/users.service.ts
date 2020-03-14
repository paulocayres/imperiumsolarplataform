// src/users/users.service.ts
import { Injectable, Logger } from '@nestjs/common';
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
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({ relations: ['perfil'] });
    return users;
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ username }, { relations: ['perfil'] });
  }

  async findUser(id: string): Promise<User> {

    const user = await this.usersRepository.findOne(id, { relations: ['perfil'] });

    if (user.perfil.id === 1) {
      const isadmin = true;
      const property = 'isadmin';
      user[property] = isadmin;
    } else if (user.perfil.id === 2) {
      const isimperium = true;
      const property = 'isimperium';
      user[property] = isimperium;
    } else if (user.perfil.id === 3) {
      const isusuario = true;
      const property = 'isusuario';
      user[property] = isusuario;
    }
    return user;
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
