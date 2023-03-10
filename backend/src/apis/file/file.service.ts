import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async uploadFile({ file }: { file: Express.MulterS3.File }) {
    if (!file) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return file.location;
  }

  async uploadFiles({ files }) {
    if (!files) {
      throw new BadRequestException('파일이 존재하지 않습니다.');
    }

    return files;
  }
}
