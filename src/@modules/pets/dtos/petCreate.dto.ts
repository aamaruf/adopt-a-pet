import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class PetCreateDTO {

  @ApiProperty({ example: "Tom" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Cat" })
  @IsNotEmpty()
  species: string;

  @ApiProperty({ example: "user ID" })
  image: string;

  @ApiProperty({ example: "user ID" })
  thumb: string;

  @ApiProperty({ example: "user ID" })
  @IsOptional()
  slug: string;

  @ApiProperty({ example: "user ID" })
  @IsOptional()
  user: string;
}
