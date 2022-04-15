import { booksAPI } from '../../api/books';
import { PAGINATION_STEP } from '../../utils/constants';
import { getBook, loadMoreBooks, searchBooks } from '../state/books/actions';
import { setSearchAction } from '../state/search/actions';

export const getBookThunk = bookId => dispatch => {
  booksAPI.getBookInfo(bookId).then(currentBook => dispatch(getBook(currentBook)));
};

export const loadMoreBooksThunk = () => (dispatch, getState) => {
  const { searchDomain, bookDomain } = getState();
  const { search } = searchDomain;
  const { startIndex } = bookDomain;
  const iteratedStartIndex = startIndex + PAGINATION_STEP;

  booksAPI.getBooks({ ...search, startIndex: iteratedStartIndex }).then(({ books }) => {
    dispatch(loadMoreBooks(books, iteratedStartIndex));
  });
};

export const searchBooksThunk = searchParams => dispatch => {
  dispatch(setSearchAction(searchParams));

  return booksAPI.getBooks(searchParams).then(({ books, totalItems }) => {
    dispatch(searchBooks(books, totalItems));
  });
};
