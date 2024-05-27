import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"
import { PASSWORD_VALIDATION_REGEX } from "../../common/constants"

export class AuthRegisterUserDto {
  @ApiProperty({
    type: String,
    example: "John Doe",
    description: "The name of the user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    type: String,
    example: "example@gmail.com",
    description: "The email of the user",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

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
