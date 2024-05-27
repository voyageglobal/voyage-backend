import { Body, Controller, Post } from "@nestjs/common"
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { AuthLoginUserDto } from "./dto/auth-login-user.dto"
import { AuthRegisterUserConfirmDto } from "./dto/auth-register-user-confirm.dto"
import { AuthRegisterUserResendConfirmDto } from "./dto/auth-register-user-resend-confirm.dto"
import { AuthRegisterUserDto } from "./dto/auth-register-user.dto"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-in")
  @ApiOperation({ summary: "Sign in" })
  @ApiBody({ type: AuthLoginUserDto, required: true, description: "The user to sign in" })
  @ApiOkResponse({
    description: "The user has been successfully signed in.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async signIn(@Body() loginUserDto: AuthLoginUserDto) {
    return this.authService.signIn(loginUserDto)
  }

  @Post("sign-up")
  @ApiOperation({ summary: "Sign up" })
  @ApiBody({
    type: AuthRegisterUserDto,
    required: true,
    description: "The user to sign up",
  })
  @ApiOkResponse({
    description: "The user has been successfully signed up.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async signUp(@Body() signUpUserDto: AuthRegisterUserDto) {
    return this.authService.signUp(signUpUserDto)
  }

  @Post("sign-up/confirm")
  @ApiOperation({ summary: "Confirm sign up" })
  @ApiBody({
    type: AuthRegisterUserConfirmDto,
    required: true,
    description: "The user to confirm sign up",
  })
  @ApiOkResponse({
    description: "The user has been successfully confirmed.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async signUpConfirm(@Body() signUpConfirmDto: AuthRegisterUserConfirmDto) {
    return this.authService.signUpConfirm(signUpConfirmDto)
  }

  @Post("sign-up/resend-confirmation-code")
  @ApiOperation({ summary: "Resend confirmation code" })
  @ApiBody({
    type: AuthRegisterUserResendConfirmDto,
    required: true,
    description: "The user to resend confirmation code",
  })
  @ApiOkResponse({
    description: "The confirmation code has been successfully resent.",
  })
  @ApiBadRequestResponse({
    description: "Bad request",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
  })
  async resendConfirmationCode(@Body() signUpConfirmResendDto: AuthRegisterUserResendConfirmDto) {
    return this.authService.resendConfirmationCode(signUpConfirmResendDto)
  }
}
