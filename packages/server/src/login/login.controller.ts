import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(200)
  async loginUser(
    @Body() userInfo: { username: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.loginService.loginUser(
      userInfo.username,
      userInfo.password,
    );

    if (token) {
      response.cookie('token', token);
      return {
        status: 'success',
      };
    }

    response.cookie('token', '');
    return {
      status: 'failure',
    };
  }

  @Get()
  async validateUser(@Req() request: Request) {
    const { token } = request.cookies;

    if (!token) {
      return {
        status: 'failure',
      };
    }

    const isValid = await this.loginService.validateSession(token);

    return {
      status: isValid ? 'success' : 'failure',
    };
  }
}
