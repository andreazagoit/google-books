import React from "react";
import { useSelector } from "react-redux";
import Book from "../components/Book";
import { selectBooks } from "../features/books/booksSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import "./Page.scss";

const HomePage = () => {
  const books = useSelector(selectBooks);

  return (
    <div className="homePage page">
      {books.length > 0 ? (
        <div className="book-list">
          {books.map((book) => (
            <Book
              key={book?.id}
              id={book?.id}
              title={book?.volumeInfo?.title}
              categories={book?.volumeInfo?.categories}
              authors={book?.volumeInfo?.authors}
              thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
              description={book?.volumeInfo?.description}
            />
          ))}
        </div>
      ) : (
        <div className="loading">
          <Player
            autoplay
            loop
            src="https://assets2.lottiefiles.com/temp/lf20_aKAfIn.json"
          />
        </div>
      )}
      {/* <button onClick={() => dispatch(addBook({ id: '4534', title: 'Titolo 2', desc: 'desc 2' }))}>Dispatch</button> */}
    </div>
  );
};

export default HomePage;
