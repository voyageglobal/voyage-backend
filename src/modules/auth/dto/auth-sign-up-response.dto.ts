import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { AuthSignUpResultDto } from "./auth-sign-up-result.dto"

export class AuthSignUpResponseDto implements ApiResponse<AuthSignUpResultDto> {
  @ApiProperty({
    type: AuthSignUpResultDto,
    description: "The sign up result",
    required: true,
  })
  data: AuthSignUpResultDto

  @ApiProperty({
    type: [ApiError],
    description: "The error messages",
    example: [
      {
        message: "Email is required",
        name: "ValidationError",
        stack: `Error: Email is required\n    at Object.<anonymous> (/app/src/modules/auth/auth.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
