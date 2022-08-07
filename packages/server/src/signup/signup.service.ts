import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { User } from 'src/types';
import { encryptPassword } from 'src/utils';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SignupService {
  constructor(private readonly dbService: DbService) {}

  async createUser(userInfo: User) {
    const userExists = <User[]>(
      await this.dbService.get(`/users?username=${userInfo.username}`)
    );

    if (userExists.length === 0) {
      const encryptedPwd = await encryptPassword(userInfo.password);

      return await this.dbService.post('/users', {
        ...userInfo,
        password: encryptedPwd,
        id: uuid(),
      });
    }

    return Promise.resolve({
      status: 500,
      data: null,
    });
  }
}
