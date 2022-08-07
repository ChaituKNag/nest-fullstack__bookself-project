import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { BookInfo } from 'src/types';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BookService {
  constructor(private readonly dbService: DbService) {}
  addBook(bookInfo: BookInfo) {
    return this.dbService.post('/books', {
      ...bookInfo,
      id: uuid(),
    });
  }
}
