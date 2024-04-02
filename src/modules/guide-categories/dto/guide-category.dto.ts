import { ApiProperty, PickType } from "@nestjs/swagger"
import { Exclude } from "class-transformer"
import { GuideCategory } from "../entities/guide-category.entity"

export class GuideCategoryDto extends PickType(GuideCategory, ["key", "name", "imageUrl"] as const) {
  @ApiProperty({
    type: String,
    description: "The key of the guide category",
    example: "explore-city",
    required: true,
  })
  key: string

  @ApiProperty({
    type: String,
    description: "The name of the guide category",
    example: "Explore City",
    required: true,
  })
  name: string

  @ApiProperty({
    type: String,
    description: "The image URL of the guide category",
    example: "https://example.com/explore-city.png",
    required: true,
  })
  imageUrl: string

  @ApiProperty({
    type: Boolean,
    description: "Whether the guide category is deleted",
    example: false,
  })
  @Exclude()
  deleted?: boolean

  @ApiProperty({
    type: Date,
    description: "The date and time the guide category was created",
    example: "2021-01-01T00:00:00Z",
  })
  @Exclude()
  createdAt?: Date

  @ApiProperty({
    type: Date,
    description: "The date and time the guide category was last updated",
    example: "2021-01-01T00:00:00Z",
  })
  @Exclude()
  updatedAt?: Date
}
