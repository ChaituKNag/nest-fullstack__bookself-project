import Link from "next/link";
import React, { FC } from "react";
import { Book } from "../../types";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  return (
    <div className="border border-orange-500 rounded-xl px-5 py-3 flex flex-col">
      <h3 className="font-semibold text-xl mb-3">{book.name}</h3>
      <p className="flex-1">{book.description}</p>
      <Link href={`/book-details/${book.id}`}>
        <a className="mt-4 mb-2 rounded bg-cyan-600 text-white px-5 py-2 rounded-md self-start text-sm font-semibold">
          See details
        </a>
      </Link>
    </div>
  );
};

export default BookCard;
