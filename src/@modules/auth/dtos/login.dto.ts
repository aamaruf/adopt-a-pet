import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'a@gmail.com' })
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  readonly password: string;
}
