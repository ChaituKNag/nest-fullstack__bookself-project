import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { User } from 'src/types';
import { comparePassword } from 'src/utils';
import * as jwt from 'jsonwebtoken';
import { SHHHH } from 'src/constants';

@Injectable()
export class LoginService {
  constructor(private readonly dbService: DbService) {}

  async loginUser(username: string, password: string) {
    const [user]: User[] = await this.dbService.get(
      `/users?username=${username}`,
    );

    const passwordsMatch = await comparePassword(password, user.password);

    if (passwordsMatch) {
      const token = jwt.sign(
        {
          username: user.username,
          name: user.name,
        },
        SHHHH,
      );

      return token;
    }
  }

  async validateSession(token: string) {
    const { username } = <{ username: string }>jwt.verify(token, SHHHH);

    const [user]: User[] = await this.dbService.get(
      `/users?username=${username}`,
    );

    if (user) {
      return true;
    }

    return false;
  }
}
