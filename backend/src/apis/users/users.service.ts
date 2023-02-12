import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user.profile.entity';
import { UserProfileImg } from './entities/user.profile.img.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,

    @InjectRepository(UserProfileImg)
    private readonly userProfileImgRepository: Repository<UserProfileImg>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user) throw new ConflictException('이미 등록된 이메일입니다.');

    const userProfileSave = await this.userProfileRepository.save({});
    const userImgSave = await this.userProfileImgRepository.save({});
    const userSave = await this.userRepository.save({
      email,
      password,
      userProfile: userProfileSave,
      userProfileImg: userImgSave,
    });

    return userSave;
  }

  async imgUpload({ email, profileImage }) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userProfile', 'userProfileImg'],
    });
    const userImgSave = await this.userProfileImgRepository.update(
      { id: user.userProfileImg.id },
      { profileImage },
    );
    console.log(userImgSave);
    // const userSave = await this.userRepository.save({
    //   ...user
    // });

    return user;
  }

  async findOne({ email }) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['userProfile', 'userProfileImg'],
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  profileImgUpload() {}
}
