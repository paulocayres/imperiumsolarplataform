// src/common/guards/authenticated.guard.ts
import { ExecutionContext, Injectable, CanActivate, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class UsuarioGuard implements CanActivate {
  constructor(private usersService: UsersService) { }

  async canActivate(context: ExecutionContext) {
    const request = await context.switchToHttp().getRequest();
    const authenticated = await request.isAuthenticated();
    if (request.user.username) {
      const user: User = await this.usersService.findPerfil(request.user.username);
      if (user.isactive && user && authenticated &&
         (user.perfil.name === 'imperium' || user.perfil.name === 'admin' || user.perfil.name === 'usuario')) {
        return true;
      } else {
        throw new ForbiddenException();
      }
    } else {
      throw new UnauthorizedException();
    }
  }
}