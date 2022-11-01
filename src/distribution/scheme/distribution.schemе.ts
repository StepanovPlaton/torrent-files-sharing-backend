import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type DistributionDocument = Distribution & Document;

@Schema()
export class Distribution {
  @ApiProperty({
    example: 'file.torrent',
    description: 'Название .torrent файла раздачи',
  })
  @Prop({ required: true })
  fileName: string;

  @ApiProperty({ description: '.torrent файл раздачи' })
  @Prop({ required: true })
  file: string;

  @ApiProperty({ example: 'Торрент раздача', description: 'Название раздачи' })
  @Prop({ required: true })
  distributionName: string;

  @ApiProperty({ description: 'Обложка раздачи' })
  @Prop({ default: '' })
  cover: string;

  @ApiProperty({ example: 'Описание раздачи', description: 'Описание раздачи' })
  @Prop({ default: '' })
  description: string;

  @ApiProperty({ description: 'Автор/Владелец раздачи' })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: mongoose.Schema.Types.ObjectId;
}

export const DistributionSchema = SchemaFactory.createForClass(Distribution);
