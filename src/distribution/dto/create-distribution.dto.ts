import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class CreateDistributionFormFields {
  @ApiProperty({
    example: 'file.torrent',
    description: 'Название .torrent файла раздачи',
  })
  fileName: string;

  @ApiProperty({ example: 'Торрент раздача', description: 'Название раздачи' })
  distributionName: string;

  @ApiProperty({ example: 'Описание раздачи', description: 'Описание раздачи' })
  description?: string;

  @ApiProperty({
    example: 'some_hashed_id',
    description: 'Автор/Владелец раздачи',
  })
  owner?: mongoose.Schema.Types.ObjectId;
}

export class CreateDistributionDto extends CreateDistributionFormFields {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: '.torrent файл раздачи',
  })
  file: Express.Multer.File;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Обложка раздачи',
  })
  cover?: Express.Multer.File;
}
