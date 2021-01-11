import React, { useEffect } from "react";
import "./App.scss";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import { searchBookAsync } from "./features/books/booksSlice";
import { useDispatch } from "react-redux";
import Banner from "./components/Banner";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchBookAsync("dummies"));
  }, [dispatch]);

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Banner />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/:id" component={SearchPage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
