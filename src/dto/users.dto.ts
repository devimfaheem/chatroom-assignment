import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}

export class UpdateUserDto {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;
}

export class ResponseUserDto {
  userId: string;
  userName: string;
  email: string;
}
