import React, { useState } from "react";
import useBooksList from "../../hooks/useBooksList";
import BookCard from "./BookCard";

const BooksList = () => {
  const { books } = useBooksList();
  return (
    <div className="my-5">
      <h2 className="font-semibold text-2xl text-center mb-5">Books list</h2>
      {/* 1. filters for all books */}
      {/* 2. books grid */}
      <div className="grid grid-flow-row grid-cols-1 auto-rows-fr sm:grid-cols-2 md: grid-cols-3 gap-5">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksList;
