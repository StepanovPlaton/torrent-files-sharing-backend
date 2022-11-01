import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';
import {
  Distribution,
  DistributionSchema,
} from 'src/distribution/scheme/distribution.schemе';
import { User, UserSchema } from './scheme/user.scheme';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Distribution.name, schema: DistributionSchema },
    ]),
  ],
  exports: [UserService],
})
export class UserModule {}
