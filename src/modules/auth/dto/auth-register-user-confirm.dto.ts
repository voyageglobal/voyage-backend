import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class AuthRegisterUserConfirmDto {
  @ApiProperty({
    type: String,
    example: "John_Doe",
    description: "The name of the user",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({
    type: String,
    example: "911911",
  })
  @IsString()
  confirmationCode: string
}
