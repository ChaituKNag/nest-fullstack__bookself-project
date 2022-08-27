import { Body, Controller, Post } from '@nestjs/common';
import { UserPayload } from 'src/types';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async createUser(@Body() userInfo: UserPayload) {
    return await this.signupService.createUser(userInfo);
  }
}
