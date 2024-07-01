import { IsNotEmpty, IsString } from "class-validator"

export class AwsCognitoSignInDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}
