import { Injectable, NotImplementedException } from "@nestjs/common"
import { AuthLoginUserDto } from "./dto/auth-login-user.dto"
import { AuthRegisterUserDto } from "./dto/auth-register-user.dto"

@Injectable()
export class AuthService {
  async signIn(loginUserDto: AuthLoginUserDto) {
    throw new NotImplementedException()
  }

  async signUp(singupUserDto: AuthRegisterUserDto) {
    throw new NotImplementedException()
  }
}
