import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FilesService } from 'src/files/files.service';
import { DistributionController } from './distribution.controller';
import { DistributionService } from './distribution.service';
import { Distribution, DistributionSchema } from './scheme/distribution.schemе';

@Module({
  providers: [DistributionService, FilesService],
  controllers: [DistributionController],
  imports: [
    MongooseModule.forFeature([
      { name: Distribution.name, schema: DistributionSchema },
    ]),
    AuthModule,
  ],
})
export class DistributionModule {}
