import { ApiProperty } from '@nestjs/swagger';

export class AuthorizationDto {
  @ApiProperty({
    example: 'user@mail.com',
    description: 'Почта пользователя',
  })
  email: string;

  @ApiProperty({ example: 'password', description: 'Пароль пользователя' })
  password: string;
}

export class TokenResponse {
  @ApiProperty({
    required: true,
    description: 'JWT токен пользователя',
  })
  token: string;
}

export class AuthDataAddedByTheGuardDto {
  user: {
    email: string;
    id: string;
  };
}
