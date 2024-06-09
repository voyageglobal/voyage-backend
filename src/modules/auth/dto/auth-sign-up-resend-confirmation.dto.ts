import { ApiProperty } from "@nestjs/swagger"

export class AuthSignUpResendConfirmationDto {
  @ApiProperty({
    type: Boolean,
    example: true,
    description: "The confirmation email has been successfully sent",
    required: true,
  })
  sent: boolean
}
