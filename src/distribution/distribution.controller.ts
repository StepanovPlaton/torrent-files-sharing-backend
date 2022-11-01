import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthDataAddedByTheGuardDto } from 'src/auth/dto/auth.dto';
import { DistributionService } from './distribution.service';
import {
  CreateDistributionDto,
  CreateDistributionFormFields,
} from './dto/create-distribution.dto';
import { UpdateDistributionDto } from './dto/update-distribution.dto';
import { Distribution } from './scheme/distribution.schemе';

@ApiTags('Раздачи')
@Controller('/distributions')
export class DistributionController {
  constructor(private readonly distributionService: DistributionService) {}

  @ApiOperation({ summary: 'Получение списка всех раздач' })
  @ApiResponse({ status: 200, type: [Distribution] })
  @Get()
  getAllDistributions() {
    return this.distributionService.getAll();
  }

  @ApiOperation({ summary: 'Получение раздачи' })
  @ApiResponse({ status: 200, type: Distribution })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'nesting', type: 'boolean' })
  @Get(':id')
  getDistribution(@Param('id') id: ObjectId) {
    return this.distributionService.get(id);
  }

  @ApiOperation({ summary: 'Добавление раздачи' })
  @ApiResponse({ status: 200, type: Distribution })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateDistributionDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'cover', maxCount: 1 },
    ]),
  )
  createDistribution(
    @Body() body: CreateDistributionFormFields,
    @UploadedFiles()
    {
      file,
      cover,
    }: {
      file: Express.Multer.File[];
      cover: Express.Multer.File[];
    },
    @Req() { user }: { user: AuthDataAddedByTheGuardDto['user'] },
  ) {
    return this.distributionService.create({
      ...body,
      user: user,
      file: file[0],
      cover: cover[0],
    });
  }

  @ApiOperation({ summary: 'Изменение раздачи' })
  @ApiResponse({ status: 200, type: Distribution })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateDistributionDto })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'cover', maxCount: 1 }]))
  updateDistribution(
    @Param('id') id: ObjectId,
    @Body() body: UpdateDistributionDto,
    @UploadedFiles() { cover }: { cover: Express.Multer.File[] },
    @Req() { user }: { user: AuthDataAddedByTheGuardDto['user'] },
  ) {
    return this.distributionService.update(id, {
      ...body,
      user: user,
      cover: cover ? cover[0] : undefined,
    });
  }

  @ApiOperation({ summary: 'Удаление раздачи' })
  @ApiResponse({ status: 200, type: Distribution })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteDistribution(
    @Param('id') id: ObjectId,
    @Req() { user }: { user: AuthDataAddedByTheGuardDto['user'] },
  ) {
    return this.distributionService.delete(id, user.id);
  }
}
