import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SearchPage.scss";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const SearchPage = () => {
  let { id } = useParams();
  const [book, setBook] = useState({});
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(function (response) {
        // handle success
        setBook(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [id]);

  return (
    <div className="searchPage page">
      <div className="searchPage__back">
        <button onClick={() => history.push("/")}>
          <ArrowBackIcon />
          <p>Indietro</p>
        </button>
      </div>
      {book?.volumeInfo?.title ? (
        <div className="container">
          <div className="searchPage__image">
            <img
              src={book?.volumeInfo?.imageLinks?.thumbnail}
              alt="book cover"
            />
          </div>
          <div className="searchPage__info">
            <h2>{book?.volumeInfo?.title}</h2>
            <h3>
              {book?.volumeInfo?.authors?.map((author, i) => (
                <span key={i}>{author}</span>
              ))}
            </h3>
            {book?.volumeInfo?.averageRating && (
              <h3>Rating: {book?.volumeInfo?.averageRating}</h3>
            )}
            <div className="searchPage__infoCategory">
              {book?.volumeInfo?.categories?.map((category, i) => (
                <p key={i}>{category}</p>
              ))}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: book?.volumeInfo?.description,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="container loadingContent">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
