import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { Book, BookInfo, UpdateBookPayload } from 'src/types';
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

  getBook(bookId: string): Promise<Book> {
    return this.dbService.get(`/books/${bookId}`);
  }

  updateBook(bookId: string, bookDetails: UpdateBookPayload) {
    return this.dbService.patch(`/books/${bookId}`, bookDetails);
  }

  deleteBook(bookId: string) {
    return this.dbService.delete(`/books/${bookId}`);
  }
}
