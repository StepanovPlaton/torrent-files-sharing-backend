import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Почта пользователя',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({
    example: 'login',
    description: 'Логин пользователя',
  })
  @Prop({ required: true })
  login: string;

  @ApiProperty({ description: 'Хеш пароля пользователя' })
  @Prop({ required: true })
  passwordHash: string;

  @ApiProperty({ description: 'Аватар пользователя' })
  @Prop({ required: false, default: '' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
