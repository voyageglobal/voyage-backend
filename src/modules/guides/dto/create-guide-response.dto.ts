import { ApiProperty } from "@nestjs/swagger"
import { ApiResponse, ApiError } from "../../common/types"
import { GuideDto } from "./guide.dto"

export class CreateGuideResponseDto implements ApiResponse<GuideDto> {
  @ApiProperty({
    type: GuideDto,
    description: "The guide data",
    required: true,
  })
  data: GuideDto

  @ApiProperty({
    type: [ApiError],
    description: "The error messages",
    example: [
      {
        message: "Guide name is required",
        name: "ValidationError",
        stack: `Error: Guide name is required\n    at Object.<anonymous> (/app/src/modules/guides/guides.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
