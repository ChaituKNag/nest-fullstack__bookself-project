import { Body, Controller, Post } from '@nestjs/common';
import { BookInfo } from 'src/types';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async addBook(@Body() bookInfo: BookInfo) {
    return await this.bookService.addBook(bookInfo);
  }
}
