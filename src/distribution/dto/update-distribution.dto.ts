import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export class UpdateDistributionFormFields {
  @ApiProperty({
    example: 'file.torrent',
    description: 'Название .torrent файла раздачи',
    required: false,
  })
  fileName?: string;

  @ApiProperty({
    example: 'Торрент раздача',
    description: 'Название раздачи',
    required: false,
  })
  distributionName?: string;

  @ApiProperty({
    example: 'Описание раздачи',
    description: 'Описание раздачи',
    required: false,
  })
  description?: string;
}

export class UpdateDistributionDto extends UpdateDistributionFormFields {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Обложка раздачи',
    required: false,
  })
  cover?: Express.Multer.File;
}
