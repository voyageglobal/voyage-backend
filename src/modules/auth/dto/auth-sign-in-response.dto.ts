import { ApiProperty } from "@nestjs/swagger"
import { ApiError, ApiResponse } from "../../common/types"
import { SignInResultDto } from "./auth-sign-in-result.dto"

export class AuthSignInResponseDto implements ApiResponse<SignInResultDto> {
  @ApiProperty({
    type: SignInResultDto,
    description: "The sign in result",
    required: true,
  })
  data: SignInResultDto

  @ApiProperty({
    type: [ApiError],
    description: "The error messages",
    example: [
      {
        message: "Invalid username or password",
        name: "UnauthorizedError",
        stack: `Error: Invalid username or password\n    at Object.<anonymous> (/app/src/modules/auth/auth.controller.ts:40:15)`,
      },
    ],
    required: false,
  })
  errors: ApiError[] | null
}
