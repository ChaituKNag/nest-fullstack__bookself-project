export interface Book {
  name: string;
  description: string;
  author: string;
  owner: string;
  pubYear: number;
}

export interface BasicResponse<T> {
  status: number;
  data: T;
}
