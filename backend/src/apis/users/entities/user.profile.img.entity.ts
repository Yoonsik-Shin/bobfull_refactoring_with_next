import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserProfileImg {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  profileImage: string;
}
