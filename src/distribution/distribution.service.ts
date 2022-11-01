import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { AuthDataAddedByTheGuardDto } from 'src/auth/dto/auth.dto';
import { FilesService, FileType } from 'src/files/files.service';
import { UserService } from 'src/user/user.service';
import { CreateDistributionDto } from './dto/create-distribution.dto';
import { UpdateDistributionDto } from './dto/update-distribution.dto';
import {
  Distribution,
  DistributionDocument,
} from './scheme/distribution.schemе';

@Injectable()
export class DistributionService {
  constructor(
    @InjectModel(Distribution.name)
    private distributionModel: Model<DistributionDocument>,
    private readonly filesService: FilesService,
  ) {}

  async create(dto: CreateDistributionDto & AuthDataAddedByTheGuardDto) {
    let { file, cover, ...distribution } = dto;
    console.log(dto);
    return await this.distributionModel.create({
      ...distribution,
      file: this.filesService.createFile(FileType.TORRENT, file),
      cover: cover
        ? this.filesService.createFile(FileType.IMAGE, cover)
        : undefined,
      owner: dto.user.id,
    });
  }

  async getAll() {
    return await this.distributionModel.find().populate('owner');
  }

  async get(distributionId: ObjectId) {
    if (await this.isExists(distributionId)) {
      return await this.distributionModel
        .findById(distributionId)
        .populate('owner');
    }
  }

  async delete(distributionId: ObjectId, userId: string) {
    if (
      (await this.isExists(distributionId)) &&
      (await this.isOwner(distributionId, userId))
    ) {
      return await this.distributionModel.findByIdAndDelete(distributionId);
    }
  }

  async update(
    distributionId: ObjectId,
    dto: UpdateDistributionDto & AuthDataAddedByTheGuardDto,
  ) {
    if (
      (await this.isExists(distributionId)) &&
      (await this.isOwner(distributionId, dto.user.id))
    ) {
      let { cover, ...distribution } = dto;
      return await this.distributionModel.findByIdAndUpdate(distributionId, {
        $set: {
          ...distribution,
          cover: cover
            ? this.filesService.createFile(FileType.IMAGE, cover)
            : undefined,
        },
      });
    }
  }

  async isOwner(distributionId: ObjectId, userId: string) {
    if (
      (await this.distributionModel.findById(distributionId))?.owner + '' ===
      userId
    )
      return true;
    throw new ForbiddenException({
      message: 'Пользователь не уполномочен, так как не является её владельцем',
    });
  }
  async isExists(distributionId: ObjectId) {
    if (!!(await this.distributionModel.findById(distributionId))) return true;
    throw new NotFoundException({
      message: 'Раздача не существует или не найдена',
    });
  }
}
