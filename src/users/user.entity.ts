import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Perfil } from './perfil.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(type => Perfil, perfil => perfil.name)
  perfis: Perfil[];
}