import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './scheme/user.scheme';
import * as bcrypt from 'bcryptjs';
import {
  Distribution,
  DistributionDocument,
} from 'src/distribution/scheme/distribution.schemе';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Distribution.name)
    private distributionModel: Model<DistributionDocument>,
  ) {}

  async create(dto: CreateUserDto) {
    let { password, avatar, ...user } = dto;
    return this.userModel.create({
      ...user,
      avatar: avatar?.originalname,
      passwordHash: await bcrypt.hash(password, 5),
    });
  }

  async getAll() {
    return this.userModel.find();
  }

  async get(userId: ObjectId, nesting: boolean = false) {
    if (nesting) {
    }
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }
}
