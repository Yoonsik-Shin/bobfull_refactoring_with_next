import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport/dist';
import { FileService } from '../file/file.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, //
    private readonly fileService: FileService,
  ) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @Get()
  @UseGuards(AuthGuard('myGuard'))
  fetchUser(@Request() req: any) {
    return this.usersService.findOne({ email: req.user.email });
  }

  @Post('/upload')
  @UseGuards(AuthGuard('myGuard'))
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfileImg(
    @UploadedFile() file: Express.MulterS3.File, //
    @Request() req: any,
  ) {
    const profileImage = await this.fileService.uploadFile({ file });
    const email = req.user.email;

    return this.usersService.imgUpload({ email, profileImage });
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
