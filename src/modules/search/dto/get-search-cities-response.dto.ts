import { ApiProperty } from "@nestjs/swagger"
import { CityDto } from "src/modules/cities/dto/city.dto"
import { PageDto, ApiError, ApiResponse } from "src/modules/common/types"

export class GetSearchCitiesResponseDto implements ApiResponse<PageDto<CityDto>> {
  @ApiProperty({
    type: [PageDto<CityDto>],
    description: "List of cities",
    required: true,
    example: [
      {
        items: [
          {
            id: "1",
            name: "City 1",
            country: {
              id: "1",
              name: "Country 1",
            },
          },
        ],
        total: 1,
        page: 1,
        pageSize: 10,
        hasMore: false,
      },
    ],
  })
  data: PageDto<CityDto>

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "City not found",
        name: "NotFoundError",
        stack: `Error: City not found\n    at Object.<anonymous> (/app/src/modules/cities/cities.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
