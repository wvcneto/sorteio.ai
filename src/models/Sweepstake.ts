import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sweepstakes')
class Sweepstake {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  award: string;

  @Column()
  award_image: string;

  @Column('time with time zone')
  date: Date;

  @Column()
  owner: string;

  @Column('text')
  participants: string;
}

export default Sweepstake;
