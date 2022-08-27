import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { User, UserPayload } from 'src/types';
import { encryptPassword } from 'src/utils';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SignupService {
  constructor(private readonly dbService: DbService) {}

  async createUser(userInfo: UserPayload) {
    const userExists = <User[]>(
      await this.dbService.get(`/users?username=${userInfo.username}`)
    );

    if (userExists.length === 0) {
      const encryptedPwd = await encryptPassword(userInfo.password);

      const resp = await this.dbService.post('/users', {
        ...userInfo,
        password: encryptedPwd,
        id: uuid(),
      });

      if (resp) {
        return {
          status: 'success',
          message: 'User created',
        };
      }
    }

    return {
      status: 'failure',
      message: 'User creation failed',
    };
  }
}
