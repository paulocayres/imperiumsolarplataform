import { Controller, UseGuards, Get, Render, Request, Post } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    @Render('createuser')
    setUser(@Request() req) {
        this.usersService.create(req.user);
        return { user: req.user };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('create')
    @Render('createuser')
    getCadastro(@Request() req) {
        return ;
    }


    @UseGuards(AuthenticatedGuard)
    @Post('delete')
    @Render('deluser')
    deleteUser(@Request() req) {
        return { user: req.user };
    }

    @UseGuards(AuthenticatedGuard)
    @Get('get')
    @Render('getuser')
    getUser(@Request() req) {
        return { user: req.user };
    }


}
