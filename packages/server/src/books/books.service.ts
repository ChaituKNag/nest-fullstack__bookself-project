import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { Book } from '../types';
@Injectable()
export class BooksService {
  constructor(private readonly dbService: DbService) {}
  async getAllBooks(): Promise<Book[]> {
    return await this.dbService.get<Book[]>('/books');
  }
}
