import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: "Phone number / Email" })
  readonly identifier: string;
}
