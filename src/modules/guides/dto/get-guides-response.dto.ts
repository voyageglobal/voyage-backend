import { ApiProperty } from "@nestjs/swagger"
import { City } from "../../cities/entities/city.entity"
import { ApiError, ApiResponse, PageDto } from "../../common/types"
import { Country } from "../../countries/entities/country.entity"
import { GuideCategory } from "../../guide-categories/entities/guide-category.entity"
import { GuideDto } from "./guide.dto"

export class GetGuidesResponseDto implements ApiResponse<PageDto<GuideDto>> {
  @ApiProperty({
    type: [PageDto<GuideDto>],
    description: "List of guides",
    required: true,
    example: [
      {
        items: [
          {
            id: "1",
            name: "Welcome to Serbia",
            text: "This is a guide to Serbia",
            visitedDateStart: new Date("2021-01-01T00:00:00.000Z"),
            visitedDateEnd: new Date("2021-01-07T00:00:00.000Z"),
            primaryImages: [],
            contentImages: [],
            countries: [
              {
                name: "Serbia",
                id: "1",
                description: "Country in Europe",
              } as Country,
            ],
            cities: [
              {
                name: "Belgrade",
                description: "Capital of Serbia",
                id: "1",
              } as City,
            ],
            categories: [
              {
                key: "1",
                name: "Food",
                imageUrl: "https://example.com/image.jpg",
              } as GuideCategory,
            ],
          } satisfies GuideDto,
        ],
      },
    ],
  })
  data: PageDto<GuideDto>

  @ApiProperty({
    type: [ApiError],
    description: "The error messages",
    example: [
      {
        message: "Guide not found",
        name: "NotFoundError",
        stack: `Error: Guide not found\n    at Object.<anonymous> (/app/src/modules/guides/guides.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
