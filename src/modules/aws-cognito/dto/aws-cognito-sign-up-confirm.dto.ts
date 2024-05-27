import { IsNotEmpty, IsString } from "class-validator"

export class AwsCognitoSignUpConfirmDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  confirmationCode: string
}
