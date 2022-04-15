import { GET_BOOK, LOAD_MORE_BOOKS, SEARCH_BOOKS } from './types';

export const getBook = currentBook => ({ type: GET_BOOK, currentBook });
export const loadMoreBooks = (books, startIndex) => ({ type: LOAD_MORE_BOOKS, books, startIndex });
export const searchBooks = (books, totalItems) => ({ type: SEARCH_BOOKS, books, totalItems });
