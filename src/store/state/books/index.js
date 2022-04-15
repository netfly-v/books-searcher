import { GET_BOOK, LOAD_MORE_BOOKS, SEARCH_BOOKS } from './types';

const initialState = {
  currentBook: {},
  books: [],
  totalItems: 0,
  startIndex: 0,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK:
      return { ...state, currentBook: action.currentBook };
    case LOAD_MORE_BOOKS:
      return {
        ...state,
        startIndex: action.startIndex,
        books: [...state.books, ...action.books],
      };
    case SEARCH_BOOKS:
      return {
        ...state,
        startIndex: initialState.startIndex,
        books: action.books,
        totalItems: action.totalItems,
      };
    default:
      return state;
  }
};
