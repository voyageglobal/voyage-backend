import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { AuthSignUpConfirmedDto } from "./auth-sign-up-confirmed.dto"

export class AuthSignUpConfirmedResponseDto implements ApiResponse<AuthSignUpConfirmedDto> {
  @ApiProperty({
    type: AuthSignUpConfirmedDto,
    description: "The confirmed sign up data",
    required: true,
  })
  data: AuthSignUpConfirmedDto

  @ApiProperty({
    type: [ApiError],
    description: "The error messages",
    example: [
      {
        message: "User not found",
        name: "UserNotFoundError",
        stack: `Error: User not found\n    at Object.<anonymous> (/app/src/modules/auth/auth.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
