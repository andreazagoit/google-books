import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = booksSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const searchBookAsync = (input) => (dispatch) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${input.replace(
        " ",
        "+"
      )}&maxResults=40`
    )
    .then(function (response) {
      // handle success
      // console.log('DATA', response.data.items);
      dispatch(setBooks(response.data.items));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectBooks = (state) => state.books.books;

export default booksSlice.reducer;
