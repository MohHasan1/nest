import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  type Relation,
} from 'typeorm';
import { Report } from '../reports/report.entity.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  isAdmin: boolean;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Relation<Report[]>;

  @AfterInsert()
  logInsert() {
    console.log('====================================');
    console.log('Inserted user with id', this.id);
    console.log('====================================');
  }
}
