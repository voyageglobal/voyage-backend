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
import { AuthSignInResponseDto } from "./dto/auth-sign-in-response.dto"
import { AuthSignUpConfirmedResponseDto } from "./dto/auth-sign-up-confirmed-response.dto"
import { AuthSignUpResendConfirmationResponseDto } from "./dto/auth-sign-up-resend-confirmation-response.dto"
import { AuthSignUpResponseDto } from "./dto/auth-sign-up-response.dto"

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
  async signIn(@Body() loginUserDto: AuthLoginUserDto): Promise<AuthSignInResponseDto> {
    try {
      const signInResult = await this.authService.signIn(loginUserDto)

      return {
        data: {
          username: signInResult.username,
          accessToken: signInResult.accessToken,
          refreshToken: signInResult.refreshToken,
        },
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }

      return {
        data: null,
        errors: [
          {
            message: "An error occurred",
            name: "Error",
            stack: "",
          },
        ],
      }
    }
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
  async signUp(@Body() signUpUserDto: AuthRegisterUserDto): Promise<AuthSignUpResponseDto> {
    try {
      const result = await this.authService.signUp(signUpUserDto)

      return {
        data: {
          email: result.email,
          username: result.username,
        },
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }

      return {
        data: null,
        errors: [
          {
            message: "An error occurred",
            name: "Error",
            stack: "",
          },
        ],
      }
    }
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
  async signUpConfirm(@Body() signUpConfirmDto: AuthRegisterUserConfirmDto): Promise<AuthSignUpConfirmedResponseDto> {
    try {
      const result = await this.authService.signUpConfirm(signUpConfirmDto)

      return {
        data: {
          confirmed: result.confirmed,
        },
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }

      return {
        data: null,
        errors: [
          {
            message: "An error occurred",
            name: "Error",
            stack: "",
          },
        ],
      }
    }
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
  async resendConfirmationCode(
    @Body() signUpConfirmResendDto: AuthRegisterUserResendConfirmDto,
  ): Promise<AuthSignUpResendConfirmationResponseDto> {
    try {
      const result = await this.authService.resendConfirmationCode(signUpConfirmResendDto)

      return {
        data: {
          sent: result.sent,
        },
        errors: null,
      }
    } catch (error) {
      if (error instanceof Error) {
        return {
          data: null,
          errors: [
            {
              message: error.message,
              name: error.name,
              stack: error.stack,
            },
          ],
        }
      }

      return {
        data: null,
        errors: [
          {
            message: "An error occurred",
            name: "Error",
            stack: "",
          },
        ],
      }
    }
  }
}
