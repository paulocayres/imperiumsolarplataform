// src/users/users.service.ts
import { Injectable, Logger, ExecutionContext } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Perfil } from './perfil.entity';



@Injectable()
export class UsersService{

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Perfil)
    private readonly perfisRepository: Repository<User>,
    ) {
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

  async findSelf(user: User): Promise<User> {

    Logger.log('user: ' + JSON.stringify(user));
    const userobj = await this.usersRepository.findOne(user.id, { relations: ['perfil'] });

    if (userobj.perfil.id === 1) {
      const isadmin = true;
      const property = 'isadmin';
      userobj[property] = isadmin;
    } else if (userobj.perfil.id === 2) {
      const isimperium = true;
      const property = 'isimperium';
      userobj[property] = isimperium;
    } else if (userobj.perfil.id === 3) {
      const isusuario = true;
      const property = 'isusuario';
      userobj[property] = isusuario;
    }
    return userobj;
  }

  findPerfil(username: string): Promise<User> {
    return this.usersRepository.findOne({ username }, { relations: ['perfil'] });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user): Promise<User> {
    await bcrypt.hash(user.password, 10, async (err, hash) => {
      user.password = hash;
      const perfil = await this.perfisRepository.findOne(user.perfilId);
      user.perfil = perfil;
      user.isactive = true;
      this.usersRepository.insert(user);
    });

    const usercreated = await this.usersRepository.findOne(user.username, { relations: ['perfil'] })
    if (usercreated.perfil.id === 1) {
      const isadmin = true;
      const property = 'isadmin';
      usercreated[property] = isadmin;
    } else if (usercreated.perfil.id === 2) {
      const isimperium = true;
      const property = 'isimperium';
      usercreated[property] = isimperium;
    } else if (usercreated.perfil.id === 3) {
      const isusuario = true;
      const property = 'isusuario';
      usercreated[property] = isusuario;
    }
    Logger.log('user: ' + JSON.stringify(user));
    return usercreated;
  }

  async updateUser(user): Promise<User> {
    const perfil = await this.perfisRepository.findOne(user.perfilId);
    user.perfil = perfil;
    if (user.isactive === '1') {
      user.isactive = true;
      Logger.log('isactive: true');
    } else {
      user.isactive = false;
      Logger.log('isactive: false');
    }
    Logger.log('user: ' + JSON.stringify(user));
    await this.usersRepository.update(user.id,
      {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      isactive: user.isactive,
      perfil: user.perfil
      }
    );
    const userupdated = await this.usersRepository.findOne(user.id, { relations: ['perfil'] })
    if (userupdated.perfil.id === 1) {
      const isadmin = true;
      const property = 'isadmin';
      userupdated[property] = isadmin;
    } else if (userupdated.perfil.id === 2) {
      const isimperium = true;
      const property = 'isimperium';
      userupdated[property] = isimperium;
    } else if (userupdated.perfil.id === 3) {
      const isusuario = true;
      const property = 'isusuario';
      userupdated[property] = isusuario;
    }
    Logger.log('user: ' + JSON.stringify(userupdated));
    return userupdated;
  }

}

