import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class UserCreateDTO {

  @ApiProperty({ example: "Tom" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "user ID" })
  image: string;

  @ApiProperty({ example: "user ID" })
  thumb: string;

  @ApiProperty({ example: "user ID" })
  @IsOptional()
  slug: string;
}
