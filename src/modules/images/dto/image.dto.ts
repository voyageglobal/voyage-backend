import { ApiProperty, PartialType, PickType } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { Image } from "../entities/image.entity"

export class ImageDto extends PartialType(PickType(Image, ["id", "type", "url"] as const)) {
  id: string
  type: string
  url: string

  @ApiProperty({
    type: Boolean,
    description: "The deleted status",
    example: false,
    required: true,
  })
  @Exclude()
  deleted?: boolean

  @ApiProperty({
    type: Date,
    description: "The creation date",
    example: "2021-09-28T00:00:00.000Z",
    required: true,
  })
  @Exclude()
  createdAt?: Date

  @ApiProperty({
    type: Date,
    description: "The update date",
    example: "2021-09-28T00:00:00.000Z",
    required: true,
  })
  @Exclude()
  updatedAt?: Date
}
