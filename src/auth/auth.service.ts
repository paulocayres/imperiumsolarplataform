// src/auth/auth.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(username, pass): Promise<any> {

    const user = await this.usersService.findOne(username);

    const resultFinal  = await bcrypt.compare(pass, user.password, (err, succes) => {
      if (user && succes) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    });

    Logger.log('result: ' + JSON.stringify(resultFinal));
    return resultFinal;
    /*     Logger.log('user: ' + username + ' : ' + pass);
        Logger.log('user: ' + username + ' : ' + user.password);
        Logger.log('user: ' + JSON.stringify(user));
        if (user && user.password === pass) {
           const { password, ...result } = user;
           Logger.log('result: ' + JSON.stringify(result));
           return result;
         }
         return null; */

  }
}
