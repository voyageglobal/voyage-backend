import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsString, IsUUID } from "class-validator"
import { City } from "./city"
import { Country } from "./country"
import { Image } from "./image"

export class Guide {
  @ApiProperty({
    type: String,
    description: "The id of the guide",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  @IsUUID(4, { message: "Invalid UUID" })
  id: string

  @ApiProperty({
    type: String,
    description: "The name of the guide",
    example: "Travel Guide to Paris",
    required: true,
  })
  @IsString()
  name: string

  @ApiProperty({
    type: String,
    description: "The content of the guide",
    example: "Paris is the capital city of France",
    required: true,
  })
  @IsString()
  text: string

  @ApiProperty({
    type: [String],
    description: "The primary images of the guide",
    example: ["https://example.com/image.jpg"],
    required: true,
  })
  primaryImages: Image[]

  @ApiProperty({
    type: [String],
    description: "The content images of the guide",
    example: ["https://example.com/image.jpg"],
    required: false,
  })
  contentImages: Image[]

  @ApiProperty({
    type: () => [Country],
    description: "The countries mentioned in the guide",
    example: ["France"],
    required: true,
  })
  countries: Country[]

  @ApiProperty({
    type: () => [City],
    description: "The cities mentioned in the guide",
    example: ["Paris"],
    required: true,
  })
  cities: City[]

  @ApiProperty({
    type: Date,
    description: "The date the guide was created",
    example: "2021-08-01T00:00:00.000Z",
  })
  @IsDate()
  createdAt: Date

  @ApiProperty({
    type: Date,
    description: "The date the guide was last updated",
    example: "2021-08-01T00:00:00.000Z",
  })
  @IsDate()
  updatedAt: Date

  @ApiProperty({
    type: Boolean,
    description: "Whether the guide has been deleted",
    example: false,
    default: false,
  })
  @IsBoolean()
  deleted: boolean
}
