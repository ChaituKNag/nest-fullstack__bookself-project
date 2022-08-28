import { useEffect, useState } from "react";
import { httpGet } from "../services/api-service";
import { Book } from "../types";

const useBooksList = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    const booksResp = await httpGet(
      `${process.env.NEXT_PUBLIC_WEB_HOST}/api/books`
    );
    setBooks(booksResp.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books
  };
};

export default useBooksList;
