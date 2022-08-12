import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { DbService } from './db.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { LogoutController } from './logout/logout.controller';
import { SignupController } from './signup/signup.controller';
import { SignupService } from './signup/signup.service';

@Module({
  controllers: [
    AppController,
    BooksController,
    SignupController,
    LoginController,
    BookController,
    LogoutController,
  ],
  providers: [
    AppService,
    BooksService,
    BookService,
    LoginService,
    SignupService,
    DbService,
  ],
})
export class AppModule {}
