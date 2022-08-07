import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/types';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  async createUser(@Body() userInfo: User) {
    return await this.signupService.createUser(userInfo);
  }
}
