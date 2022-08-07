import { Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('logout')
export class LogoutController {
  @Post()
  @HttpCode(200)
  async logoutUser(
    @Req() req: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.cookie('token', '');
    return {
      status: 'success',
    };
  }
}
