import { ApiProperty } from "@nestjs/swagger"

export class SignInResultDto {
  @ApiProperty({
    type: String,
    description: "The username of the signed in user",
    example: "john.doe",
    required: true,
  })
  username: string

  @ApiProperty({
    type: String,
    description: "The access token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huLmRvZSJ9.3mJ0zKb5V2c3J",
  })
  accessToken: string

  @ApiProperty({
    type: String,
    description: "The refresh token",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huLmRlZSJ9.3mJ0zKb5V2c3J",
  })
  refreshToken: string
}
