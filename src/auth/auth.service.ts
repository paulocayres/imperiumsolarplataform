// src/auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(username, pass): Promise<any> {
    Logger.log('user: ' + username + ' : ' + pass);
    const user = await this.usersService.findOne(username);
    Logger.log('user: ' + user);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      Logger.log('result: ' + result);
      return result;
    }
    return null;
  }
}
