import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"
import { PASSWORD_VALIDATION_REGEX } from "../../common/constants"

export class AwsCognitoSignUpDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_VALIDATION_REGEX, { message: "Password is too weak" })
  password: string
}
