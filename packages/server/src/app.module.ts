import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './books/books.controller';
import { SignupController } from './signup/signup.controller';
import { LoginController } from './login/login.controller';
import { PasswordController } from './password/password.controller';
import { BookController } from './book/book.controller';
import { BooksService } from './books/books.service';
import { BookService } from './book/book.service';
import { LoginService } from './login/login.service';
import { PasswordService } from './password/password.service';
import { SignupService } from './signup/signup.service';
import { DbService } from './db.service';
import { LogoutController } from './logout/logout.controller';

@Module({
  controllers: [
    AppController,
    BooksController,
    SignupController,
    LoginController,
    PasswordController,
    BookController,
    LogoutController,
  ],
  providers: [
    AppService,
    BooksService,
    BookService,
    LoginService,
    PasswordService,
    SignupService,
    DbService,
  ],
})
export class AppModule {}
