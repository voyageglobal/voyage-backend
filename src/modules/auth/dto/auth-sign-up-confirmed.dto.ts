import { ApiProperty } from "@nestjs/swagger"

export class AuthSignUpConfirmedDto {
  @ApiProperty({
    type: Boolean,
    description: "The confirmation status",
    example: true,
    required: true,
  })
  confirmed: boolean
}
