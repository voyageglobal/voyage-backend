import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { TotalStatsDto } from "./total-stats.dto"

export class GetTotalStatsResponseDto implements ApiResponse<TotalStatsDto> {
  @ApiProperty({
    type: TotalStatsDto,
    description: "Total stats",
    required: true,
    example: {
      totalUsers: 1000,
      totalCities: 200,
      totalGuides: 50,
      totalCountries: 10,
    },
  })
  data: TotalStatsDto

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "Stats not found",
        name: "NotFoundError",
        stack: `Error: Stats not found\n    at Object.<anonymous> (/app/src/modules/cities/cities.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
