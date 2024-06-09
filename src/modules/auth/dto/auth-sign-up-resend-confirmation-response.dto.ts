import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { AuthSignUpResendConfirmationDto } from "./auth-sign-up-resend-confirmation.dto"

export class AuthSignUpResendConfirmationResponseDto implements ApiResponse<AuthSignUpResendConfirmationDto> {
  @ApiProperty({
    type: AuthSignUpResendConfirmationDto,
    description: "The resend confirmation data",
    required: true,
  })
  data: AuthSignUpResendConfirmationDto

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
