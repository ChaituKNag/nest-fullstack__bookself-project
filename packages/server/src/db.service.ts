import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

const URL_PREFIX = `http://localhost:4500`;
@Injectable()
export class DbService {
  async get<T>(relativeUrl: string): Promise<T> {
    const response = await fetch(`${URL_PREFIX}${relativeUrl}`);

    return await response.json();
  }

  async post<T>(relativeUrl: string, body: T) {
    const response = await fetch(`${URL_PREFIX}${relativeUrl}`, {
      method: 'post',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async put<T>(relativeUrl: string, body: T) {
    const response = await fetch(`${URL_PREFIX}${relativeUrl}`, {
      method: 'put',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async patch<T>(relativeUrl: string, body: T) {
    const response = await fetch(`${URL_PREFIX}${relativeUrl}`, {
      method: 'patch',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }

  async delete(relativeUrl: string) {
    const response = await fetch(`${URL_PREFIX}${relativeUrl}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await response.json();
  }
}
