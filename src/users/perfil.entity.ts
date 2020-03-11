import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}