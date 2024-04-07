import { ApiProperty, PickType } from "@nestjs/swagger"
import { Exclude, Type } from "class-transformer"
import { City } from "../../cities/entities/city.entity"
import { Image } from "../../images/entities/image.entity"
import { Country } from "../entities/country.entity"

export class CountryDto extends PickType(Country, ["id", "name", "description", "flag", "cities", "images"] as const) {
  @ApiProperty({
    type: String,
    description: "The id of the county",
    example: "c7912662-26ea-435c-a1f7-66f52d1440ff",
    required: true,
  })
  id: string

  @ApiProperty({ type: String, description: "The name of the country", example: "France", required: true })
  name: string

  @ApiProperty({ type: String, description: "The flag of the country", example: "🇫🇷", required: true })
  flag: string

  @ApiProperty({
    type: String,
    description: "The description of the country",
    example: "France is a country located in Western Europe",
  })
  description: string

  @ApiProperty({
    type: [City],
    description: "The cities of the country",
    example: [
      {
        id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
        name: "Paris",
        description: "Paris is the capital city of France",
        country: {
          id: "c7912662-26ea-435c-a1f7-66f52d1440ff",
          name: "France",
          description: "France is a country located in Western Europe",
          images: [
            {
              url: "https://example.com/image.jpg",
              type: "jpg",
              alt: "Eiffel Tower",
            },
          ],
          deleted: false,
        },
        images: [
          {
            url: "https://example.com/image.jpg",
            type: "jpg",
            alt: "Eiffel Tower",
          },
        ],
      },
    ],
    required: true,
    minItems: 1,
  })
  @Type(() => City)
  cities: City[]

  @ApiProperty({
    type: [Image],
    description: "The images of the country",
    example: [
      {
        url: "https://example.com/image.jpg",
        type: "jpg",
        alt: "Eiffel Tower",
      },
    ],
    required: true,
    minItems: 1,
  })
  @Type(() => Image)
  images: Image[]

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
