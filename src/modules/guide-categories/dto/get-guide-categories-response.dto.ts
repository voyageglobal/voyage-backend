import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { GuideCategoryDto } from "./guide-category.dto"

export class GetGuideCategoriesResponseDto implements ApiResponse<GuideCategoryDto[]> {
  @ApiProperty({
    type: [GuideCategoryDto],
    description: "Guide categories",
    required: true,
    example: [
      {
        key: "nature",
        name: "Nature",
        imageUrl: "https://example.com/nature.jpg",
        iconName: "nature",
      },
      {
        key: "sightseeing",
        name: "Sightseeing",
        imageUrl: "https://example.com/sightseeing.jpg",
        iconName: "sightseeing",
      },
    ],
  })
  data: GuideCategoryDto[]

  @ApiProperty({
    type: ApiError,
    description: "Error message",
    required: false,
    example: [
      {
        message: "Guide categories not found",
        name: "NotFoundError",
        stack: `Error: Guide categories not found\n    at Object.<anonymous> (/app/src/modules/guide-categories/guide-categories.controller.ts:40:15)`,
      },
    ],
  })
  errors: ApiError[] | null
}
