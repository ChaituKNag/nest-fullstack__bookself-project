import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { LoginService } from 'src/login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService) {}

  canActivate(context: ExecutionContext): Promise<boolean> {
    return new Promise((resolve) => {
      const request: Request = context.switchToHttp().getRequest();
      let token = request.cookies.token;
      if (!token) {
        token = (<string>request.query.token).trim();
      }
      if (!token || token === '') return resolve(false);
      this.loginService.validateSession(token).then(resolve);
    });
  }
}
