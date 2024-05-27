import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class AuthRegisterUserResendConfirmDto {
  @ApiProperty({
    type: String,
    example: "John_Doe",
    description: "The name of the user",
    required: true,
  })
  @IsString()
  username: string
}
