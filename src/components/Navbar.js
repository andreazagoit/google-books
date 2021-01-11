import React, { useState } from "react";
import "./Navbar.scss";
import { searchBookAsync, setBooks } from "../features/books/booksSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const Navbar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [input, setInput] = useState("");

  const search = (e) => {
    console.log("SEARCH");
    e.preventDefault();
    if (input.length > 2) {
      dispatch(setBooks({}));
      history.push("/");
      dispatch(searchBookAsync(input));
    } else {
      alert("Testo troppo corto");
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="navbar__brand">
          <h2>Google Books</h2>
        </Link>
        <div className="navbar__links">
          <form>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Cerca su Google Books..."
            />
            <button type="submit" onClick={(e) => search(e)}>
              Invia
            </button>
          </form>
          <a href="https://github.com/andreazagoit/google-books">
            <GitHubIcon />
          </a>
          <a href="https://www.linkedin.com/in/andrea-zago-1495941b9/">
            <LinkedInIcon />
          </a>
          <a href="mailto:info@andreazago.it">
            <MailOutlineIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
