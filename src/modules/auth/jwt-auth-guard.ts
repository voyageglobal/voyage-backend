import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { Observable } from "rxjs"

@Injectable()
export class JwtAuthGuard extends AuthGuard("cognito-jwt") {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context)
  }

  handleRequest<AwsCognitoUserDto>(err: never, _user: never): AwsCognitoUserDto {
    if (err || !_user) {
      throw err || new UnauthorizedException()
    }

    return _user
  }
}
