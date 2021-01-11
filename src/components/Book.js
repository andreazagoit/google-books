import React from "react";
import "./Book.scss";
import { Link } from "react-router-dom";

const Book = ({ id, title, authors, thumbnail, description }) => {
  return (
    <Link to={`/${id}`} className="book">
      {thumbnail ? (
        <img src={thumbnail} alt="book" />
      ) : (
        <h2>Immagine non disponibile</h2>
      )}
      <div className="book__content">
        <p className="title">{title}</p>
        <p className="authors">{authors?.join(", ")}</p>
        <p className="description">{description}</p>
      </div>
    </Link>
  );
};

export default Book;
