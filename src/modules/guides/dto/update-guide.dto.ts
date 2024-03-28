import { ApiProperty, PickType } from "@nestjs/swagger"
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, IsUUID } from "class-validator"
import {
  GUIDE_CATEGORIES_MAX_SIZE,
  GUIDE_CATEGORIES_MIN_SIZE,
  GUIDE_CITIES_MIN_SIZE,
  GUIDE_COUNTRIES_MIN_SIZE,
} from "../constants"
import { Guide } from "../entities/guide.entity"

export class UpdateGuideDto extends PickType(Guide, ["id", "name", "text", "primaryImages", "contentImages"] as const) {
  @ApiProperty({
    type: [String],
    description: "The list of primary images ids the guide has",
    examples: ["9a55ee15-d3b6-464f-85b8-755d314b33c1"],
  })
  id: string

  @ApiProperty({
    type: String,
    description: "The guide name",
    example: "My guide",
  })
  name: string

  @ApiProperty({
    type: String,
    description: "The guide text",
    example: "This is my guide",
  })
  text: string

  @ApiProperty({
    type: [String],
    description: "The list of cities ids the guide is about",
    examples: ["9a55ee15-d3b6-464f-85b8-755d314b33c1"],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(GUIDE_CITIES_MIN_SIZE)
  cities: string[]

  @ApiProperty({
    type: [String],
    description: "The list of countries ids the guide is about",
    examples: ["9a55ee15-d3b6-464f-85b8-755d314b33c1"],
  })
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMinSize(GUIDE_COUNTRIES_MIN_SIZE)
  countries: string[]

  @ApiProperty({
    type: [String],
    description: "The list of categories keys the guide is about",
    example: ["photography", "food"],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(GUIDE_CATEGORIES_MIN_SIZE)
  @ArrayMaxSize(GUIDE_CATEGORIES_MAX_SIZE)
  categories: string[]
}
