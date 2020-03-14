import { Controller, UseGuards, Get, Render, Request, Post, Body } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ImperiumGuard } from 'src/common/guards/imperium.guard';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @UseGuards(AdminGuard)
    @Post('create')
    @Render('createuser')
    setUser(@Request() req, @Body() user: User) {
        this.usersService.create(user);
        return user;
    }

    @UseGuards(AdminGuard)
    @Get('create')
    @Render('createuser')
    getCadastro(@Request() req) {
        return ;
    }


    @UseGuards(AdminGuard)
    @Post('delete')
    @Render('deluser')
    deleteUser(@Request() req) {
        return { user: req.user };
    }

    @UseGuards(ImperiumGuard)
    @Get('get')
    @Render('getuser')
    getUser(@Request() req) {
        return { user: req.user };
    }


}
