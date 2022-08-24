import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { User } from 'src/types';
import { comparePassword, encryptPassword } from 'src/utils';
import * as jwt from 'jsonwebtoken';
import { SHHHH } from 'src/constants';

@Injectable()
export class LoginService {
  constructor(private readonly dbService: DbService) {}

  async getUserInfo(username: string): Promise<User> {
    const [user]: User[] = await this.dbService.get(
      `/users?username=${username}`,
    );

    return user;
  }

  async getUserInfoFromToken(token: string): Promise<User | null> {
    if (!token) return null;
    const { username } = <{ username: string }>jwt.verify(token, SHHHH);

    return await this.getUserInfo(username);
  }

  async loginUser(username: string, password: string) {
    const user = await this.getUserInfo(username);
    if (!user) {
      return '';
    }
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
    console.log('validateSession', token);
    if (!token) {
      return false;
    }
    const { username } = <{ username: string }>jwt.verify(token, SHHHH);

    const user = await this.getUserInfo(username);

    if (user) {
      return true;
    }

    return false;
  }

  async validateCredentials(username: string, existingPassword: string) {
    const user = await this.getUserInfo(username);
    if (user && (await comparePassword(existingPassword, user.password))) {
      return true;
    }

    return false;
  }

  async resetPassword(username: string, newPassword: string) {
    const user = await this.getUserInfo(username);
    return await this.dbService.patch(`/users/${user.id}`, {
      password: await encryptPassword(newPassword),
    });
  }
}
