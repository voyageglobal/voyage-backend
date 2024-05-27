import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AwsCognitoSignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
