// src/common/guards/authenticated.guard.ts
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) { }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authenticated = request.isAuthenticated();
    // const admin = this.usersService.findOne({"username": request.username});
    return true;
  }
}
