import { Injectable } from '@nestjs/common';
import { Book } from '../types';
@Injectable()
export class BooksService {
  getAllBooks(): Book[] {
    return [];
  }
}
