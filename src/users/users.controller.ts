import { Controller, UseGuards, Get, Render, Request, Post, Body, Logger, Param } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ImperiumGuard } from 'src/common/guards/imperium.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }



    @UseGuards(ImperiumGuard)
    @Get('users')
    @Render('getusers')
    async getUsers(@Request() req) {
         const users = await this.usersService.findAll();
         Logger.log('users controller: ' + JSON.stringify(users));
         return { usersArray: users }
    }

    @UseGuards(ImperiumGuard)
    @Get('user/:id')
    @Render('getuser')
    async getUser(@Param() params) {
        const userobj = await this.usersService.findUser(params.id);
        return { user: userobj };
    }

    @UseGuards(AdminGuard)
    @Get('create')
    @Render('createuser')
    getCadastro(@Request() req) {
        return ;
    }

    @UseGuards(AdminGuard)
    @Post('create')
    @Render('createuser')
    setUser(@Request() req, @Body() user: User) {
        this.usersService.create(user);
        return user;
    }

    @UseGuards(AdminGuard)
    @Post('bloq')
    @Render('bloquser')
    deleteUser(@Request() req) {
        return { user: req.user };
    }
}
