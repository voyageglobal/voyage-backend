import { ApiProperty } from "@nestjs/swagger"

export class AuthSignUpResultDto {
  @ApiProperty({
    type: String,
    description: "The username of the signed up user",
    example: "john.doe",
    required: true,
  })
  username: string

  @ApiProperty({
    type: String,
    description: "The email of the signed up user",
    example: "",
    required: true,
  })
  email: string
}
