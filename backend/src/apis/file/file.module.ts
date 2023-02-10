import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { multerOptionsFactory } from 'src/commons/utils/multer.options';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
