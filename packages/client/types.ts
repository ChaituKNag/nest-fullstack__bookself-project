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

export interface Breadcrumb {
  title: string;
  link?: string;
}
