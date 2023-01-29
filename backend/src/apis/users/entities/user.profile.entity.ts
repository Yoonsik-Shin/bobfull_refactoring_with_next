import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  alchol: boolean;

  @Column({ default: false })
  talk: boolean;

  @Column({ default: false })
  smoke: boolean;

  @Column({ default: false })
  gender: boolean;

  @Column({ default: 3 })
  speed: number;
}
