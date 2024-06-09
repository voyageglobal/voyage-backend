import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches } from "class-validator"
import { PASSWORD_VALIDATION_REGEX } from "../../common/constants"

export class AuthLoginUserDto {
  @ApiProperty({
    type: String,
    example: "john_doe",
    description: "The username of the user",
    required: true,
  })
  @IsNotEmpty()
  username: string

  @ApiProperty({
    type: String,
    example: "Password123*",
    description: "The password of the user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_VALIDATION_REGEX, {
    message: "Password must contain at least 8 characters, one letter and one number.",
  })
  password: string
}
