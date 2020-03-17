import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Perfil } from './perfil.entity';
import { Cliente } from 'src/cliente/cliente.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isactive: boolean;

  @ManyToOne(type => Perfil, perfil => perfil.users)
  perfil: Perfil;

  @OneToMany(type => Cliente, cliente => cliente.user)
  clientes: Cliente[];
}