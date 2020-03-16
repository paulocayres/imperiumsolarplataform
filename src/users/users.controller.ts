import { Body, Controller, Get, Param, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ImperiumGuard } from 'src/common/guards/imperium.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }



    @UseGuards(ImperiumGuard)
    @Get('users')
    @Render('getusers')
    async getUsers() {
         const users = await this.usersService.findAll();
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
    getCadastro() {
        return ;
    }

    @UseGuards(AdminGuard)
    @Post('create')
    @Render('getuser')
    setUser(@Body() userBody: User) {
        const usercreated = this.usersService.create(userBody);
        return { user: usercreated };
    }

    @UseGuards(AdminGuard)
    @Post('update')
    @Render('getuser')
    async bloqUser(@Body() userBody: User) {
        const userupdated = await this.usersService.updateUser(userBody);
        return { user: userupdated };
    }
}
