import { ApiProperty } from "@nestjs/swagger";

export class PetUpdateDTO {
  @ApiProperty({ example: "brand name" })
  name: string;

  @ApiProperty({ example: "user ID" })
  updatedBy: string;

  @ApiProperty({ example: "image url" })
  image: string;

  @ApiProperty({ example: "thumb url" })
  thumb: string;

  // @ApiProperty({ example: "thumb url" })
  // formImage: any;
}
