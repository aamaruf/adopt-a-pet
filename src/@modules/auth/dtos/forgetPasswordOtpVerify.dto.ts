import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class ForgotPasswordOTPVerifyDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Phone Number / Email" })
  readonly identifier: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @ApiProperty({ example: "123456" })
  readonly otp: string;

  @ApiProperty({ example: "123456" })
  readonly password: string;
}
