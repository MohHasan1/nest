import { Exclude } from 'class-transformer';
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('====================================');
    console.log('Inserted user with id', this.id);
    console.log('====================================');
  }
}
