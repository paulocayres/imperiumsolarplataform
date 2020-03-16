import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Perfil } from './perfil.entity';

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

  @OneToOne(type => Perfil,
    {
      eager: true,
      cascade: ['insert', 'update']
    })
  @JoinColumn()
  perfil: Perfil;
}