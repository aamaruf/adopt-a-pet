import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  identifier: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  @MaxLength(50)
  @IsOptional()
  name: string;

  @ApiProperty({ type: 'string' })
  @IsString()
  password: string;
}
