export interface BookInfo {
  name: string;
  description: string;
  author: string;
  owner?: string;
  pubYear: number;
}
export interface Book extends BookInfo {
  id: string;
}

export type UpdateBookPayload = {
  name?: string;
  description?: string;
  author?: string;
  pubYear: string;
};

export interface User {
  id: string;
  username: string;
  name: string;
  password: string;
}

export interface DBData {
  books: Book[];
  users: User[];
}

export interface BasicResponse<T> {
  status: number;
  data: T;
}
