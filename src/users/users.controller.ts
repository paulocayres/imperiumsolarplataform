import { Controller, UseGuards, Get, Render, Request, Post, Logger, Body } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    @Render('createuser')
    setUser(@Request() req, @Body() user: User) {
        Logger.log('user: ' + JSON.stringify(user));
        this.usersService.create(user);
        return user;
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
