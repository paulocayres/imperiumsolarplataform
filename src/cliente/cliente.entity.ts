import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  telefone: string;

  @Column()
  cpfcnpj: string;

  @Column()
  tipopessoa: string;

  @Column()
  celular: string;

  @Column()
  email: string;

  @Column()
  data: string;

  @ManyToOne(type => User, user => user.clientes)
  user: User;
}