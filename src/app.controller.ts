// src/app.controller.ts
import {
  Controller,
  Get,
  Post,
  Request,
  Res,
  Render,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';

import { LoginGuard } from './common/guards/login.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { UsuarioGuard } from './common/guards/usuario.guard';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {

  @Get('/')
  @Render('login')
  index(@Request() req): { message: string } {
    return { message: req.flash('loginError') };
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @Get('/erro')
  @Render('erro')
  getErro(@Request() req) : { message: string } {
      return { message: req.flash('loginError') };
  }

  @UseGuards(UsuarioGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
      return { user: req.user};
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
