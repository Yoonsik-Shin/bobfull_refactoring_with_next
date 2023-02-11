import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Req,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { FileService } from './file.service';
import { Express } from 'express';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService, //
  ) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.MulterS3.File, //
  ) {
    // console.log(file);
    return this.fileService.uploadFile({ file });
  }

  @Post('/uploads')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>, //
  ) {
    // console.log(files);
    return this.fileService.uploadFiles({ files });
  }
}
