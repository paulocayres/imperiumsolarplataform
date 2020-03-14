// src/common/guards/authenticated.guard.ts
import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
// import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/users/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private usersService: UsersService) { }

  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    const authenticated = await request.isAuthenticated();
    const user: User = await this.usersService.findPerfil(request.user.username);
    if (authenticated && user.perfil.name === 'admin'){
      return true;
    } else {
      return false;
    }

  }
}
