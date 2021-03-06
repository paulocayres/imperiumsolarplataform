import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Perfil } from './users/perfil.entity';
import { ClienteModule } from './cliente/cliente.module';
import { Cliente } from './cliente/cliente.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'pccr0976',
      database: 'imperium',
      entities: [User, Perfil, Cliente],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    ClienteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
