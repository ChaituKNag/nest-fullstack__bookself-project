import { Controller, Get } from '@nestjs/common';
import { BasicResponse, Book } from 'src/types';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(): BasicResponse<Book[]> {
    return {
      status: 200,
      data: this.booksService.getAllBooks(),
    };
  }
}
