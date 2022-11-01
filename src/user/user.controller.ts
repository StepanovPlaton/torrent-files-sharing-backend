import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './scheme/user.scheme';
import { UserService } from './user.service';

@ApiTags('Пользователи')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiQuery({ name: 'nesting', type: 'boolean' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(
    @Param() { id }: { id: ObjectId },
    @Query('nesting') nesting: boolean,
  ) {
    return this.userService.get(id, nesting);
  }
}
