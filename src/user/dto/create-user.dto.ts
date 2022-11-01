import { ApiProperty } from '@nestjs/swagger';
import { AuthorizationDto } from 'src/auth/dto/auth.dto';

export class CreateUserFormFields extends AuthorizationDto {
  @ApiProperty({
    example: 'login',
    description: 'Логин пользователя',
  })
  login: string;
}

export class CreateUserDto extends CreateUserFormFields {
  @ApiProperty({
    required: false,
    type: 'string',
    format: 'binary',
    description: 'Аватар пользователя',
  })
  avatar?: Express.Multer.File;
}
