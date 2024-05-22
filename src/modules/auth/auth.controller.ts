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
  @ApiBody({ type: AuthRegisterUserDto, required: true, description: "The user to sign up" })
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
}
