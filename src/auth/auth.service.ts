import {
  createParamDecorator,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User, UserDocument } from 'src/user/scheme/user.scheme';
import { UserService } from 'src/user/user.service';
import { AuthDataAddedByTheGuardDto, AuthorizationDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authorization(userDto: AuthorizationDto) {
    const user = await this.userService.getByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user?.passwordHash ?? '',
    );
    if (user && passwordEquals) {
      return this.generateToken(user);
    } else {
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    }
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userService.create(userDto);
    return this.generateToken(user);
  }

  private async generateToken(user: UserDocument) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
