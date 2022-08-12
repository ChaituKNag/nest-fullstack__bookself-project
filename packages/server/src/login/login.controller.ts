import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from 'src/_guards/auth.guard';
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

  @Get('status')
  @UseGuards(AuthGuard)
  async validateUser() {
    return {
      status: 'success',
    };
  }

  @Post('reset_pwd')
  async updatePassowrd(@Req() request: Request, @Res() response: Response) {
    const { username, existingPassword, newPassword } = request.body;

    if (
      await this.loginService.validateCredentials(username, existingPassword)
    ) {
      await this.loginService.resetPassword(username, newPassword);
      response.cookie('token', '');
      return {
        status: true,
        message: 'Password has been reset successfully!',
      };
    }

    return {
      status: false,
      error: 'Passwords did not match',
    };
  }
}
