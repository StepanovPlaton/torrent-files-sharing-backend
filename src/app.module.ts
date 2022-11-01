import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DistributionModule } from './distribution/distribution.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://192.168.32.64:27017/TorrentFilesSharing'),
    DistributionModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
