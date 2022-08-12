import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginService } from 'src/login/login.service';
import { Book, BookInfo, UpdateBookPayload } from 'src/types';
import { AuthGuard } from 'src/_guards/auth.guard';
import { BookService } from './book.service';

@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly loginService: LoginService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  async addBook(@Body() bookInfo: BookInfo, @Req() req: Request) {
    const { token } = req.cookies;
    const user = await this.loginService.getUserInfoFromToken(token);
    return await this.bookService.addBook({
      ...bookInfo,
      owner: user.username,
    });
  }

  @Get(':bookId')
  async getBook(@Param('bookId') bookId: string) {
    return await this.bookService.getBook(bookId);
  }

  @Post(':bookId')
  @UseGuards(AuthGuard)
  async updateBook(
    @Param('bookId') bookId: string,
    @Body()
    bookDetails: UpdateBookPayload,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // only owner can update
    const existingDetails: Book = await this.bookService.getBook(bookId);
    const { token } = req.cookies;
    const user = await this.loginService.getUserInfoFromToken(token);
    if (existingDetails.owner !== user.username) {
      res.status(403).json({
        statusCode: 403,
        message: 'Book not owned by the user',
      });
    } else {
      return await this.bookService.updateBook(bookId, bookDetails);
    }
  }

  @Delete(':bookId')
  @UseGuards(AuthGuard)
  async deleteBook(
    @Param('bookId') bookId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // only owner can delete
    const existingDetails: Book = await this.bookService.getBook(bookId);
    const { token } = req.cookies;
    const user = await this.loginService.getUserInfoFromToken(token);
    if (existingDetails.owner !== user.username) {
      res.status(403).json({
        statusCode: 403,
        message: 'Book not owned by the user',
      });
    } else {
      await this.bookService.deleteBook(bookId);
      return {
        status: 'success',
      };
    }
  }
}
