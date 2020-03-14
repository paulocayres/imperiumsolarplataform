// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(username, pass): Promise<any> {

    const user = await this.usersService.findOne(username);

    const match = await bcrypt.compare(pass, user.password);

    if (user && match) {
      const { password, ...result } = user;
      return result;
    } else{
      return null;
    }
  }
}
