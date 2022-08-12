import { Controller, Get, UseGuards } from '@nestjs/common';
import { BasicResponse, Book } from 'src/types';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<BasicResponse<Book[]>> {
    return {
      status: 200,
      data: await this.booksService.getAllBooks(),
    };
  }
}
