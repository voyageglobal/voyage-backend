import { IsNotEmpty, IsString } from "class-validator"

export class AwsCognitoSignInResultDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  refreshToken: string

  @IsString()
  @IsNotEmpty()
  accessToken: string
}
